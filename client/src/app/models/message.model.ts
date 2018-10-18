import {User} from "./user.model";

export class Message {
  constructor(private owner: User, private content: string) {}
}
