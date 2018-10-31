import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../models/message.model";
import {ChatService} from "../../services/chat.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'private-chat-tab',
  templateUrl: './private-chat-tab.component.html',
  styleUrls: ['./private-chat-tab.component.css']
})
export class PrivateChatTabComponent implements OnInit {

  public messages: Message[];
  @Input() user: User;
  private message: string;

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


}
