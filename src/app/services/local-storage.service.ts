import {Injectable} from '@angular/core';
import {LSUser} from '../model/ls-user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly AUTHORIZED_USER = 'authorized_user';
  private readonly TOKEN = 'token';

  public setAuthorizedUser(user: LSUser) {
    localStorage.setItem(this.AUTHORIZED_USER, JSON.stringify(user));
  }

  public getAuthorizedUser(): LSUser {
    return JSON.parse(localStorage.getItem(this.AUTHORIZED_USER));
  }

  public getUserRole() {
    if (this.getAuthorizedUser() !== null) {
      return this.getAuthorizedUser().role;
    }
    return null;
  }

  public getUserID() {
    if (this.getAuthorizedUser() !== null) {
      return this.getAuthorizedUser().id;
    }
    return null;
  }

  public clear() {
    localStorage.clear();
  }

  public isAuthorized(): boolean {
    return this.getAuthorizedUser() !== null;
  }

  public isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  public isUser(): boolean {
    return this.getUserRole() === 'USER';
  }

  getToken() {
    return localStorage.getItem(this.TOKEN);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }
}
