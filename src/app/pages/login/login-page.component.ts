import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {LSUser} from '../../model/ls-user.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService,
              private userService: UserService,
              private  router: Router,
              private spinner: NgxSpinnerService) {
  }

  loginError: boolean;
  bannedUser: boolean;

  ngOnInit(): void {
  }

  login(event) {
    this.loginError = false;
    this.bannedUser = false;
    this.spinner.show();
    this.userService.getToken(event).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((value) => {
      if (value) {
        this.localStorageService.setToken(value.token);
        this.userService.getUserByEmail(event.email).subscribe((user) => {
          if (!user) {
            this.loginError = true;
            this.bannedUser = false;
          } else if (user.status === 'BANNED') {
            this.loginError = false;
            this.bannedUser = true;
            this.localStorageService.clear();
          } else {
            this.localStorageService.setAuthorizedUser(new LSUser(user.id, user.role));
            this.userService.setLogin();
            this.router.navigate(['/feed']);
          }
        }, () => {
        });
      }
    }, () => {
      this.loginError = true;
      this.bannedUser = false;
    });
  }
}
