import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ReportService} from '../../services/report.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReportDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: number,
              private reportService: ReportService,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
  }

  onClick(report: string): void {
    if (this.data) {
      this.spinner.show();
      this.reportService.sendReport(this.data, report).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe(() => {
        this.snackBar.open('Report send', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      });
    }
    this.dialogRef.close();
  }
}
