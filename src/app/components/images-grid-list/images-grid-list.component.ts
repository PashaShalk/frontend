import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PostService} from '../../services/post.service';
import {Post} from '../../model/post.model';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../model/user.model';
import {AccountPostComponent} from '../account-post/account-post.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-images-grid-list',
  templateUrl: './images-grid-list.component.html',
  styleUrls: ['./images-grid-list.component.css']
})
export class ImagesGridListComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog,
              private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private spinner: NgxSpinnerService) {
  }

  @Input()
  user: User;

  posts: Post[];
  page: number;
  countOnPage = 6;
  notscrolly = true;
  notEmptyPost = true;

  ngOnInit(): void {
    this.spinner.show();
    this.page = 0;
    this.activatedRoute.params.subscribe((params) => {
      this.postService.getUserPosts(params.nickname, this.page, this.countOnPage).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe((posts) => {
        this.posts = posts;
      });
    });
  }

  openDialog(post: Post): void {
    this.dialog.open(AccountPostComponent, {data: post, autoFocus: false, maxHeight: '90vh'});
  }

  onScroll() {
    if (this.notscrolly && this.notEmptyPost) {
      this.notscrolly = false;
      this.loadNextPosts();
    }
  }

  private loadNextPosts() {
    this.page++;
    this.spinner.show();
    this.postService.getUserPosts(this.user.nickname, this.page, this.countOnPage).pipe(finalize(() => {
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

  ngAfterViewInit(): void {
    this.postService.update.subscribe(() => {
      this.spinner.show();
      this.page = 0;
      this.postService.getUserPosts(this.user.nickname, this.page, this.countOnPage).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe((posts) => {
        this.posts = posts;
      });
    });
  }
}
