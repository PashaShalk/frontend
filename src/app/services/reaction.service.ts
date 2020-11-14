import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReactionData} from '../model/reaction-data.model';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private http: HttpClient) {
  }

  getReactionData(userId: number, postId: number) {
    return this.http.get<ReactionData>('api/reactions/user/' + userId + '/post/' + postId);
  }

  changeLikeStatus(userId: number, postId: number, likeStatus: boolean) {
    return this.http.get<ReactionData>('api/reactions/user/' + userId
      + '/post/' + postId
      + '/likeStatus/' + likeStatus);
  }

  changeDislikeStatus(userId: number, postId: number, dislikeStatus: boolean) {
    return this.http.get<ReactionData>('api/reactions/user/' + userId
      + '/post/' + postId
      + '/dislikeStatus/' + dislikeStatus);

  }

  changeLikeAndDislikeStatuses(userId: number, postId: number, likeStatus: boolean, dislikeStatus: boolean) {
    return this.http.get<ReactionData>('api/reactions/user/' + userId
      + '/post/' + postId
      + '/likeStatus/' + likeStatus
      + '/dislikeStatus/' + dislikeStatus);
  }
}
