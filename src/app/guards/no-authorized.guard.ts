import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthorizedGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.localStorageService.isAuthorized()) {
      return true;
    } else {
      this.router.navigate(['/feed']);
      return false;
    }
  }
}
