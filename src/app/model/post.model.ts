import {User} from './user.model';
import {Hashtag} from './hashtag.model';

export class Post {
  id: number;
  author: User;
  description: string;
  date: Date;
  hashtags: Hashtag[];
  photoURIs: string[];
}
