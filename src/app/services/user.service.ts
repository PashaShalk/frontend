import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthorizedUser} from '../model/authorized-user.model';
import {LoginData} from '../model/login-data.model';
import {RegisteredUser} from '../model/registered-user.model';
import {User} from '../model/user.model';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {UserInfo} from '../model/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private $login: Subject<any> = new ReplaySubject(1);

  get login(): Observable<any> {
    return this.$login.asObservable();
  }

  setLogin() {
    this.$login.next();
  }

  registerUser(user: RegisteredUser) {
    return this.http.post<boolean>('/api/users/registration', user);
  }

  getUserByID(id: number) {
    return this.http.get<User>('/api/users/id/' + id);
  }

  getAvatar(id: number) {
    return this.http.get('/api/users/avatar/' + id, { responseType: 'blob' });
  }

  getUserByNickname(nickname: string) {
    return this.http.get<User>('/api/users/nickname/' + nickname);
  }

  getAllUsers(page: number, count: number) {
    return this.http.get<User[]>('/api/users/page/' + page + '/count/' + count);
  }

  getCountAllUsers() {
    return this.http.get<number>('/api/users/count');
  }

  blockUser(id: number) {
    return this.http.get('/api/users/blocking/' + id);
  }

  unblockUser(id: number) {
    return this.http.get('api/users/unblocking/' + id);
  }

  uploadAvatar(id: number, avatar: File) {
    const data = new FormData();
    data.append('file', avatar[0]);
    return this.http.post('api/users/newavatar/' + id, data);
  }

  updateInfo(userInfo: UserInfo, id: number) {
    return this.http.post<User>('api/users/updating/' + id, userInfo);
  }

  getToken(loginData: LoginData) {
    return this.http.post<AuthToken>('api/token/generate-token', loginData);
  }

  getUserByEmail(email: string) {
    return this.http.get<AuthorizedUser>('/api/users/email/' + email);
  }
}

export interface AuthToken {
  readonly token: string;
}
