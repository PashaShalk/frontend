import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  pageSize = 10;
  length: number;
  users: User[];
  displayedColumns: string[] = ['photo', 'nickname', 'name', 'surname', 'status'];

  constructor(private userService: UserService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.spinner.show();
    this.userService.getAllUsers(0, this.pageSize).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((users) => {
      this.users = users;
    });
    this.userService.getCountAllUsers().subscribe((count) => {
      this.length = count;
    });
  }

  update(event) {
    this.spinner.show();
    this.userService.getAllUsers(event.pageIndex, this.pageSize).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((users) => {
      this.users = users;
    });
  }

  changeUserStatus(user: User, page: number) {
    this.spinner.show();
    if (user.status === 'ACTIVE') {
      this.userService.blockUser(user.id).subscribe(() => {
        this.userService.getAllUsers(page, this.pageSize).pipe(finalize(() => {
          this.spinner.hide();
        })).subscribe((users) => {
          this.users = users;
        });
        this.snackBar.open('User was blocked', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      });
    } else {
      this.userService.unblockUser(user.id).subscribe(() => {
        this.userService.getAllUsers(page, this.pageSize).pipe(finalize(() => {
          this.spinner.hide();
        })).subscribe((users) => {
          this.users = users;
        });
        this.snackBar.open('User was unblocked', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      });
    }
  }
}

