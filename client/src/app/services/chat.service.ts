import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import {Message} from "../models/message.model";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators/map'


@Injectable()
export class ChatService {

  private socket;

  constructor(private http: HttpClient) {}

  public connectUser(username: string) {
    this.socket = io('http://localhost:9000', { query: "username="+username });
  }

  public sendMessage(message: Message) {
    this.socket.emit('message', message);
  }



  public getMessage() {
    return new Observable<Message>((observer) => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }


  public checkUsernameAvailability(username): Observable<boolean> {

    return this.http.get('http://localhost:9000/api/checkUsername/'+username).pipe(map((res: boolean) => res));

  }


}
