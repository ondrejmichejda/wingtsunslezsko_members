import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {UserAuthenticationService} from './user-authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,
              private userAuth: UserAuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userAuth.isLoggedAdmin()) {
      return true;
    } else {
      return false;
    }
  }

}
