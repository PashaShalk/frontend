import {Post} from './post.model';

export class Report {
  id: number;
  reason: string;
  post: Post;
  date: string;
  status: string;
}
