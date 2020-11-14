import {Component, Input, OnInit} from '@angular/core';
import {ReportDialogComponent} from '../report-dialog/report-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {LSUser} from '../../model/ls-user.model';
import {LocalStorageService} from '../../services/local-storage.service';
import {Post} from '../../model/post.model';

@Component({
  selector: 'app-post-menu',
  templateUrl: './post-menu.component.html',
  styleUrls: ['./post-menu.component.css']
})
export class PostMenuComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private localStorageService: LocalStorageService) {
  }

  @Input()
  post: Post;

  authorizedUser: LSUser;

  ngOnInit(): void {
    this.authorizedUser = this.localStorageService.getAuthorizedUser();
  }

  openReportDialog(): void {
    this.dialog.open(ReportDialogComponent, {data: this.post.id});
  }
}
