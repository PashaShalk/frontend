import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../model/post.model';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  private $update: Subject<any> = new ReplaySubject(1);

  get update(): Observable<any> {
    return this.$update.asObservable();
  }

  setUpdate() {
    this.$update.next();
  }

  addPost(images: File[], id: number, description: string) {
    const data = new FormData();
    images.forEach((image) => {
      data.append('images', image);
    });
    if (description !== undefined && description.length > 0) {
      data.append('description', description);
    }
    return this.http.post('api/posts/user/' + id + '/newpost', data);
  }

  getUserPosts(nickname: string, page: number, count: number) {
    return this.http.get<Post[]>('api/posts/user/' + nickname + '/page/' + page + '/count/' + count);
  }

  getSubscriptionsPosts(id: number, page: number, count: number) {
    return this.http.get<Post[]>('api/posts/feed/user/' + id + '/page/' + page + '/count/' + count);
  }

  getAllPostsIn12Hours(page: number, count: number) {
    return this.http.get<Post[]>('api/posts/feed/page/' + page + '/count/' + count);
  }

  getPostsByHashtag(hashtag: string, page: number, count: number) {
    return this.http.get<Post[]>('api/posts/hashtag/' + hashtag + '/page/' + page + '/count/' + count);
  }

  deletePost(postId: number, authorId: number) {
    return this.http.delete('api/posts/delete/post/' + postId + '/author/' + authorId);
  }
}
