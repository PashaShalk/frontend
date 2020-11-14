import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Report} from '../../model/report.model';
import {ReportService} from '../../services/report.service';
import {Post} from '../../model/post.model';
import {AccountPostComponent} from '../../components/account-post/account-post.component';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {

  reports: Report[];
  length: number;
  pageSize = 10;
  displayedColumns: string[] = ['post', 'date', 'reason', 'actions'];

  constructor(public dialog: MatDialog,
              private reportService: ReportService,
              private userService: UserService,
              private postService: PostService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.reportService.getAllReports(0, this.pageSize).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((reports) => {
      this.reports = reports;
    });
    this.reportService.getCountAllReports().subscribe((count) => {
      this.length = count;
    });
  }

  update(event) {
    this.spinner.show();
    this.reportService.getAllReports(event.pageIndex, this.pageSize).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((reports) => {
      this.reports = reports;
    });
  }

  openDialog(post: Post): void {
    this.dialog.open(AccountPostComponent, {data: post, autoFocus: false, maxHeight: '90vh'});
  }

  changeReportStatus(report: Report, page: number) {
    this.spinner.show();
    if (report.status === 'UNCHECKED') {
      this.reportService.markAsChecked(report.id).subscribe(() => {
        this.reportService.setCount();
        this.reportService.getAllReports(page, this.pageSize).pipe(finalize(() => {
          this.spinner.hide();
        })).subscribe((reports) => {
          this.reports = reports;
        });
      });
    } else {
      this.reportService.markAsUnchecked(report.id).subscribe(() => {
        this.reportService.setCount();
        this.reportService.getAllReports(page, this.pageSize).pipe(finalize(() => {
          this.spinner.hide();
        })).subscribe((reports) => {
          this.reports = reports;
        });
      });
    }
  }

  deletePost(report: Report, page: number) {
    this.spinner.show();
    this.postService.deletePost(report.post.id, report.post.author.id).subscribe(() => {
      this.reportService.getAllReports(page, this.pageSize).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe((reports) => {
        this.reports = reports;
      });
      this.snackBar.open('Post was deleted', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
      if (report.status === 'UNCHECKED') {
        this.changeReportStatus(report, page);
      }
    });
  }
}
