import {Component, OnInit} from '@angular/core';
import {Post} from '../../model/post.model';
import {PostService} from '../../services/post.service';
import {LSUser} from '../../model/ls-user.model';
import {LocalStorageService} from '../../services/local-storage.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent implements OnInit {

  constructor(private postService: PostService,
              private localStorageService: LocalStorageService,
              private spinner: NgxSpinnerService) {
  }

  posts: Post[];
  page: number;
  countOnPage = 3;
  notscrolly = true;
  notEmptyPost = true;
  authorizedUser: LSUser;

  ngOnInit(): void {
    this.spinner.show();
    this.authorizedUser = this.localStorageService.getAuthorizedUser();
    this.page = 0;
    if (this.authorizedUser.role === 'USER') {
      this.postService.getSubscriptionsPosts(this.authorizedUser.id, this.page, this.countOnPage).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe((posts) => {
        this.posts = posts;
      });
    } else {
      this.postService.getAllPostsIn12Hours(this.page, this.countOnPage).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe((posts) => {
        this.posts = posts;
      });
    }
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.notscrolly = false;
      this.loadNextPosts();
    }
  }

  loadNextPosts() {
    this.spinner.show();
    this.page++;

    if (this.authorizedUser.role === 'USER') {
      this.postService.getSubscriptionsPosts(this.authorizedUser.id, this.page, this.countOnPage).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe((posts) => {
        const newPosts = posts;

        if (newPosts.length === 0) {
          this.notEmptyPost = false;
        }
        this.posts = this.posts.concat(newPosts);
        this.notscrolly = true;
      });
    } else {
      this.postService.getAllPostsIn12Hours(this.page, this.countOnPage).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe((posts) => {
        const newPosts = posts;

        if (newPosts.length === 0) {
          this.notEmptyPost = false;
        }
        this.posts = this.posts.concat(newPosts);
        this.notscrolly = true;
      });
    }
  }
}
