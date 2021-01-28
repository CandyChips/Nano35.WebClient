import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenService} from "../services/token.service";
import {Guid} from "guid-typescript";



@Injectable({ providedIn: 'root' })
export class InstanceTypeGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentInstance = this.tokenService.currentInstanceSubject.value;
    if (currentInstance == null) {
      this.router.navigate(['/instances']);
      return false;
    }
    return true;
  }
}
