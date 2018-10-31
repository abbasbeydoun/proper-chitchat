import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user.model";
import {Message} from "../../models/message.model";
import {ChatService} from "../../services/chat.service";


@Component({
  selector: 'group-chat-tab',
  templateUrl: './group-chat-tab.component.html',
  styleUrls: ['./group-chat-tab.component.css']
})
export class GroupChatTabComponent implements OnInit {

  public messages: Message[];
  @Input() user: User;
  private message: string;
  @Output() onUserClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(private chatService: ChatService) {
    this.messages = [];
    this.message = '';
  }

  ngOnInit() {
    this.getMessage();
  }

  sendMessage(): void {

    if(this.message !== '') {
      this.chatService.sendMessage(new Message(this.user, this.message));
      this.message = '';
    }
  }

  getMessage(): void {
    this.chatService.getMessage().subscribe((msg: Message) => {
      this.messages.push(msg);
    });
  }



  initiatePrivateChat(username: string): void {

    if(username !== 'SERVER') {
      // emit user data to parent component (chat-tabs-container) so it can dynamically generate a private-chat-tab component and pass the user as input

      this.onUserClick.emit(username);


      const msg = new Message(this.user, "This is a test message");
      this.chatService.sendPrivateMessage(msg, new User(username));

    }

  }




}
