import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentByPostId(postId: number) {
    return this.http.get<Comment[]>('api/comments/post/' + postId);
  }
  sendComment(postId: number, userId: number, text: string){
    return this.http.post('api/comments/post/' + postId + '/user/' + userId, text);
  }
}
