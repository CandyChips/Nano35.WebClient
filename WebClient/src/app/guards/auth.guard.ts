import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenService} from "../services/token.service";



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.tokenService.currentTokenSubject.value;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
