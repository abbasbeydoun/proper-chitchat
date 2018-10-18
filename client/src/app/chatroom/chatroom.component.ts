import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {User} from "../models/user.model";
import {Message} from "../models/message.model";
import {ChatService} from "../services/chat.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import {UsernameDialogComponent} from "../dialogs/username-dialog/username-dialog.component";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewInit {

  public messages: Message[];
  private user: User;
  private message: string;

  constructor(private chatService: ChatService, public dialog: MatDialog) {
    this.messages = [];
    this.user = new User('');
    this.message = '';
  }

  ngOnInit() {}

  ngAfterViewInit(){
   setTimeout(() => this.askForUsername());

  }

  private askForUsername(): void {

    const dialogRef = this.dialog.open(UsernameDialogComponent, {
      width: '250px',
      height: '200px',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(choosenUsername => {
      if(choosenUsername) {
        this.user['username'] = choosenUsername;
        this.chatService.connectUser(choosenUsername);
        this.getMessage(); // subscribe the user to receive messages after user is connected
      }else{
        this.askForUsername();
      }
    });

  }


   sendMessage(): void {
    this.chatService.sendMessage(new Message(this.user, this.message));
    this.message = '';
  }

   getMessage(): void {
    this.chatService.getMessage().subscribe((msg: Message) => {
      this.messages.push(msg);
    });
  }




}