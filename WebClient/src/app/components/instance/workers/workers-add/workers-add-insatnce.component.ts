import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../../services/token.service";
import {Router} from "@angular/router";
import {IdentityService} from "../../../../services/identity.service";
import {WorkersService} from "../../../../services/workers.service";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-insatnce-workers-add',
  templateUrl: './workers-add-insatnce.component.html',
  styleUrls: ['./workers-add-insatnce.component.scss']
})
export class WorkersInstanceAddComponent {
  form!: FormGroup;
  error = "";
  workerRoles: any;
  loaded = false;

  constructor(
    private tokenService: TokenService,
    private identityService: IdentityService,
    private router: Router,
    private workerService: WorkersService,
    private formBuilder: FormBuilder) {

    this.workerService.getAllWorkerRoles().subscribe((data: any) => {
      this.workerRoles = data;
      this.loaded = true;
    });

    this.form = this.formBuilder.group({
      roleId: [
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
      ],
      comment: [
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
      email: [
        "",
        [
          Validators.required
        ]
      ],
      password: [
        "",
        [
          Validators.required
        ]
      ],
      passwordConfirm: [
        "",
        [
          Validators.required
        ]
      ]
    });
  }

  onSubmin() {
    this.identityService.getIdentity().subscribe((data: any) => {
      this.workerService.createWorker(this.form.value)
        .subscribe(
          (data: any) => {

          },
          (error: any) => {

          }
        )
    });
  }
}
