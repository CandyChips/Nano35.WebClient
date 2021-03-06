import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../../services/token.service";
import {IdentityService} from "../../../../services/identity.service";
import {Router} from "@angular/router";
import {UnitsService} from "../../../../services/units.service";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-insatnce-units-details',
  templateUrl: './units-details-insatnce.component.html',
  styleUrls: ['./units-details-insatnce.component.scss']
})
export class UnitsInstanceDetailsComponent {
  form!: FormGroup;
  error = "";
  unitTypes: any;
  loaded = false;

  constructor(
    private tokenService: TokenService,
    private identityService: IdentityService,
    private router: Router,
    private unitsService: UnitsService,
    private formBuilder: FormBuilder) {

    this.unitsService.getAllUnitTypes().subscribe((data: any) => {
      this.unitTypes = data;
      this.loaded = true;
    });

    this.form = this.formBuilder.group({
      id: [
        Guid.create().toString(),
        [
          Validators.required
        ]
      ],
      instanceId: [
        this.tokenService.currentInstanceId,
        [
          Validators.required
        ]
      ],
      unitTypeId: [
        "",
        [
          Validators.required
        ]
      ],
      phone: [
        "",
        [
          Validators.required
        ]
      ],
      workingFormat: [
        "",
        [
          Validators.required
        ]
      ],
      adress: [
        "",
        [
          Validators.required
        ]
      ],
      name: [
        "",
        [
          Validators.required
        ]
      ]
    });
  }

  onSubmin() {
    this.identityService.getIdentity().subscribe((data: any) => {
      this.unitsService.createUnit(this.form.value)
        .subscribe(
          (data: any) => {

          },
          (error: any) => {
            console.log(error);
          }
        )
    });
  }
}
