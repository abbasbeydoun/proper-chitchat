const express = require('express');

const app = express();

const http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const MongoClient = require('mongodb').MongoClient;

const getRandomValues = require('get-random-values');

class User {
    constructor(username) {
        this.username = username;
    }
}

class Message {
    constructor(owner, content) {
        this.owner = owner;
        this.content = content;
    }
}

let db;

// This is a mlab account i created for development purposes


// In production, the username and password would be read from a config file and that has strict permissions set to it

// TODO: Actually do that


MongoClient.connect('mongodb://abbasbeydoun95:mlabpass69@ds129823.mlab.com:29823/storage', { useNewUrlParser: true }  , (err, database) => {

    if (err) return console.log(err);
    db = database.db('storage')

});

// RFC4122 compliant UUID generator

uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
};



const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/api/checkUsername/:username', (req, res) => {
    const username = req.params['username'];

    db.collection('connected_users').findOne({username: username}).then((returnedUser) => {

        // sends true if user exists, false if user does not
        if(returnedUser) {
            return res.status(200).send(true);
        }
        return res.status(200).send(false);
    });

});




let last_five = [];



function updateLastFive(message) {
    if(last_five.length === 5) {
        last_five.shift();
        last_five.push(message);
    }else{
        last_five.push(message);
    }
}


io.on('connection', (socket) => {

    let username = socket.handshake.query['username'] ? socket.handshake.query['username'] : 'ERR: UNDEFINED USERNAME';
    let socketID = socket.id;

    /*
    1- Generate user UUID string
    2- Check if that UUID exists, if it does, generate new user UUID string, check if that exists, etc ...
    3 - If UUID does not exist, add to list of users in db
     */



    const generateUser = () => {

        let USERUUID = 'User'+uuidv4();

        if(db) {

            db.collection('connected_users').findOne({user: USERUUID}).then((returnedUser) => {


                while (returnedUser !== null) {
                    generateUser();
                }

                const userJoinedMessage = new Message(new User('SERVER'), username + ' has joined the chatroom');



                // send connected user last five messsages

                for(let i=0;i<last_five.length;i++){
                    if(last_five[i]){
                        io.to(socketID).emit('message', last_five[i]);
                    }
                }

                io.emit('message', userJoinedMessage);

                updateLastFive(userJoinedMessage);


                // Unique userID confirmed and generated, add to database

                db.collection('connected_users').insertOne({
                    user: USERUUID,
                    username: username,
                    socketid: socketID
                }, (err, result) => {
                    if (err) console.log(err);
                });




            });

        }else {

            // error connecting to database


        }

    };


    generateUser();

    socket.on('message', (message) => {

        io.emit('message', message);

        updateLastFive(message);

    });


    socket.on('privatemessage', (dataObject) => {

        const message = dataObject['message'];
        const to = dataObject['to'];

        // TODO: Get user's socketID from database using username, then emit message to that user

    });


    socket.on('disconnect', () => {

        const message = new Message(new User('SERVER'), username+' has left the chatroom');

        io.emit('message', message);

        updateLastFive(message);

        db.collection('connected_users').findOne({socketid: socketID}).then((returnedUser) => {

            db.collection('connected_users').deleteOne({user: returnedUser['user']}, (err, result) => {
                if(err) console.log(err);
            });

        });



    });


});




server.listen(9000, () => {
    console.log('Server is live');
});