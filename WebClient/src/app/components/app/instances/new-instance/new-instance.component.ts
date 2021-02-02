import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {IdentityService} from "../../../../services/identity.service";
import {TokenService} from "../../../../services/token.service";
import {InstanceService} from "../../../../services/instance.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-instance',
  templateUrl: './new-instance.component.html',
  styleUrls: ["./new-instance.component.scss"]
})
export class NewInstancesComponent implements OnInit {
  form!: FormGroup;
  isLoading = true;
  regions: any;
  types: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private instanceService: InstanceService) {
    this.instanceService.getAllRegions().subscribe((regionsData: any) => {
      this.regions = regionsData;
      this.instanceService.getAllTypes().subscribe((typesData: any) => {
        this.types = typesData;
        this.isLoading = false;
      });
    })
  }

  ngOnInit() {
  }
}
