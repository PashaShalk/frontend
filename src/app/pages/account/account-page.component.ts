import {Component, OnInit} from '@angular/core';
import {User} from '../../model/user.model';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private spinner: NgxSpinnerService) {
  }

  user: User;

  ngOnInit(): void {
    this.spinner.show();
    this.activatedRoute.params.subscribe((params) => {
      this.userService.getUserByNickname(params.nickname).pipe(finalize(() => {
        this.spinner.hide();
      })).subscribe((user) => {
        this.user = user;
      });
    });
  }
}
