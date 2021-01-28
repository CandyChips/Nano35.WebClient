import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {IdentityService} from "../../../services/identity.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  identity: any;

  constructor(private identityService: IdentityService) {

    identityService.getIdentity().subscribe((data: any) => {
      this.identity = data.data;
    });
  }

  ngOnInit() {
  }
}
