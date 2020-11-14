import {LoginPageComponent} from '../pages/login/login-page.component';
import {RegistrationPageComponent} from '../pages/registration/registration-page.component';
import {FeedPageComponent} from '../pages/feed/feed-page.component';
import {AccountPageComponent} from '../pages/account/account-page.component';
import {HashtagPageComponent} from '../pages/hashtag/hashtag-page.component';
import {UsersPageComponent} from '../pages/users/users-page.component';
import {ReportsPageComponent} from '../pages/reports/reports-page.component';
import {AdminGuard} from '../guards/admin.guard';
import {UserGuard} from '../guards/user.guard';
import {NoAuthorizedGuard} from '../guards/no-authorized.guard';
import {AuthorizedGuard} from '../guards/authorized.guard';

export const Routes = [
  {path: 'login', component: LoginPageComponent, canActivate: [NoAuthorizedGuard]},
  {path: 'registration', component: RegistrationPageComponent, canActivate: [NoAuthorizedGuard]},
  {path: 'user/:nickname', component: AccountPageComponent, canActivate: [UserGuard]},
  {path: 'hashtag/:hashtag', component: HashtagPageComponent, canActivate: [AuthorizedGuard]},
  {path: 'users', component: UsersPageComponent, canActivate: [AdminGuard]},
  {path: 'reports', component: ReportsPageComponent, canActivate: [AdminGuard]},
  {path: 'feed', component: FeedPageComponent, canActivate: [AuthorizedGuard]},
  {path: '**', redirectTo: '/login'}
];
