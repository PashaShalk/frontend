import {User} from './user.model';

export class Comment {
  author: User;
  text: string;
  date: Date;
}
