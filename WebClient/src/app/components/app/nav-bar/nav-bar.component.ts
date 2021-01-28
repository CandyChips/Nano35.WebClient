import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {TokenService} from "../../../services/token.service";
import {IdentityService} from "../../../services/identity.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  identity: any;

  constructor(
    private tokenService: TokenService,
    private identityService: IdentityService) {

    tokenService.currentTokenSubject.subscribe((token: string) => {
      if(token != null) {
        identityService.getIdentity().subscribe((data: any) => {
          this.identity = data;
        });
      }
    });

  }
}
