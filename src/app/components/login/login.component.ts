import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginMatcher} from '../custom-validator';
import {LoginData} from '../../model/login-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
  }

  @Input()
  loginError: boolean;

  @Input()
  bannedUser: boolean;

  @Output()
  login: EventEmitter<LoginData> = new EventEmitter();

  hide: boolean;
  loginForm: FormGroup;
  loginMatcher = new LoginMatcher();

  _login() {
    this.login.next(this.loginForm.value);
  }

  ngOnInit(): void {
    this.hide = true;

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(254)]),
      password: new FormControl('', [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)]),
    });
  }
}

