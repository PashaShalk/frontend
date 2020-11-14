import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../model/user.model';
import {UserService} from '../../services/user.service';
import {ReportService} from '../../services/report.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  constructor(public localStorageService: LocalStorageService,
              private userService: UserService,
              private reportService: ReportService) {
  }

  user: User;
  countUnread: number;

  ngOnInit(): void {
    if (!this.localStorageService.isAuthorized()) {
      this.userService.login.subscribe(() => {
        this.userService.getUserByID(this.localStorageService.getUserID()).subscribe((user) => {
          this.user = user;
          this.getCountUnreadReports();
        });
      });
    } else if (this.localStorageService.isAuthorized()) {
      this.userService.getUserByID(this.localStorageService.getUserID()).subscribe((user) => {
        this.user = user;
        this.getCountUnreadReports();
      });
    }
  }

  getCountUnreadReports() {
    if (this.user && this.user.role === 'ADMIN') {
      this.reportService.getCountUnreadReports().subscribe((count) => {
        this.countUnread = count;
      });
    }
  }

  logout() {
    this.localStorageService.clear();
  }

  ngAfterViewInit(): void {
    this.userService.login.subscribe(() => {
      this.userService.getUserByID(this.localStorageService.getUserID()).subscribe((user) => {
        this.user = user;
        this.getCountUnreadReports();
      });
    });
    this.reportService.count.subscribe(() => {
      this.getCountUnreadReports();
    });
  }
}
