import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UsernameDialogComponent} from "../dialogs/username-dialog/username-dialog.component";
import {User} from "../models/user.model";
import {ChatService} from "../services/chat.service";
import {Message} from "../models/message.model";
import {MatDialog} from '@angular/material';

@Component({
  selector: 'chat-tabs-container',
  templateUrl: './chat-tabs-container.component.html',
  styleUrls: ['./chat-tabs-container.component.css']
})
export class ChatTabsContainerComponent implements OnInit, AfterViewInit {

  chatPartners: Array<User>;
  user: User;
  userConnected: boolean = false;

  constructor(private chatService: ChatService, public dialog: MatDialog) {
    this.chatPartners = [];
  }

  ngOnInit() {}

  ngAfterViewInit(){
    setTimeout(() => this.askForUsername('unknown'));
  }

  private askForUsername(data: string): void {

    const dialogRef = this.dialog.open(UsernameDialogComponent, {
      width: '250px',
      height: '200px',
      disableClose: true,
      autoFocus: true,
      data: {userExists: data}
    });

    dialogRef.afterClosed().subscribe(choosenUsername => {

      if(choosenUsername) {

        // check if username is already taken

        this.chatService.checkUsernameAvailability(choosenUsername).subscribe((userExists) => {

          if(!userExists) {

            this.user = new User(choosenUsername);
            this.chatService.connectUser(choosenUsername);
            this.userConnected = true;

          }else {
            this.askForUsername('true');
          }

        });

      }else{
        this.askForUsername('unknown');
      }
    });

  }


  initiatePrivateChat(username: string) {


    let isAlreadyChatPartner = false;

    for(let i=0;i<this.chatPartners.length;i++){
      if(this.chatPartners[i]['username'] === username){
        isAlreadyChatPartner = true;
      }
    }

    if(!isAlreadyChatPartner && username !== this.user['username']) {
      this.chatPartners.push(new User(username));

    }


  }



  receivePrivateChat(user: User) {



  }



}

