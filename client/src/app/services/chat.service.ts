import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import {Message} from "../models/message.model";
import {Observable} from "rxjs/Observable";

export class ChatService {

  private socket;

  constructor() {}

  public connectUser(username: string) {
    this.socket = io('http://localhost:9000', { query: "username="+username });
  }

  public sendMessage(message: Message) {
    this.socket.emit('message', message);
  }



  public getMessage() {
    return new Observable<Message>((observer) => {
      this.socket.on('message', (data: Message) => observer.next(data));
      // this.socket.on('newuserjoined', (data: Message) => observer.next(data));
    });
  }


}
