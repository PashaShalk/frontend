import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {LoginComponent} from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {LoginPageComponent} from './pages/login/login-page.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RegistrationPageComponent} from './pages/registration/registration-page.component';
import {SearchBoxComponent} from './components/search-box/search-box.component';
import {PostComponent} from './components/post/post.component';
import {PostMenuComponent} from './components/post-menu/post-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {RouterModule} from '@angular/router';
import {Routes} from './routes/routes';
import {FeedPageComponent} from './pages/feed/feed-page.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {ReportDialogComponent} from './components/report-dialog/report-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ImageCarouselComponent} from './components/image-carousel/image-carousel.component';
import {AccountPageComponent} from './pages/account/account-page.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ImagesGridListComponent} from './components/images-grid-list/images-grid-list.component';
import {AccountHeaderComponent} from './components/account-header/account-header.component';
import {HashtagPageComponent} from './pages/hashtag/hashtag-page.component';
import {ReportsPageComponent} from './pages/reports/reports-page.component';
import {UsersPageComponent} from './pages/users/users-page.component';
import {MatBadgeModule} from '@angular/material/badge';
import {AddPostDialogComponent} from './components/add-post-dialog/add-post-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {EditInfoDialogComponent} from './components/edit-info-dialog/edit-info-dialog.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NoAuthorizedGuard} from './guards/no-authorized.guard';
import {UserGuard} from './guards/user.guard';
import {AdminGuard} from './guards/admin.guard';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import { AccountPostComponent } from './components/account-post/account-post.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {APIInterceptor} from './interceptors/api-interceptor';
import {AuthorizedGuard} from './guards/authorized.guard';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoginPageComponent,
    RegistrationComponent,
    RegistrationPageComponent,
    SearchBoxComponent,
    PostComponent,
    PostMenuComponent,
    FeedPageComponent,
    ReportDialogComponent,
    ImageCarouselComponent,
    AccountPageComponent,
    ImagesGridListComponent,
    AccountHeaderComponent,
    HashtagPageComponent,
    ReportsPageComponent,
    UsersPageComponent,
    AddPostDialogComponent,
    EditInfoDialogComponent,
    AccountPostComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatBadgeModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTooltipModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatCarouselModule,
    NgbCarouselModule,
  ],
  providers: [NoAuthorizedGuard, AuthorizedGuard, UserGuard, AdminGuard, APIInterceptor, {
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [ReportDialogComponent, PostComponent]
})
export class AppModule {
}
