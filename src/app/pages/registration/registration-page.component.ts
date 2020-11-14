import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {RegisteredUser} from '../../model/registered-user.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private userService: UserService,
              private  router: Router,
              private spinner: NgxSpinnerService) {
  }

  registrationError: boolean;

  ngOnInit(): void {
  }

  register(event) {
    this.registrationError = false;
    this.spinner.show();
    this.userService.registerUser(new RegisteredUser(
        event.controls.email.value,
        event.controls.nickname.value,
        event.controls.firstName.value,
        event.controls.lastName.value,
        event.controls.aboutMyself.value,
        event.controls.passwordGroup.value.password,
        event.controls.passwordGroup.value.confirmPassword)).pipe(finalize(() => {
      this.spinner.hide();
    })).subscribe((user) => {
      if (!user) {
        this.registrationError = true;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
