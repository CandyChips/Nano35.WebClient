import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../../services/token.service";
import {Router} from "@angular/router";
import {IdentityService} from "../../../../services/identity.service";
import {WorkersService} from "../../../../services/workers.service";
import {Guid} from "guid-typescript";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-insatnce-workers-add',
  templateUrl: './workers-add-insatnce.component.html',
  styleUrls: ['./workers-add-insatnce.component.scss']
})
export class WorkersAddDialogComponent {
  form!: FormGroup;
  error = "";
  workerRoles: any;
  loaded = false;

  constructor(
    private tokenService: TokenService,
    private identityService: IdentityService,
    private router: Router,
    private workerService: WorkersService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WorkersAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

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
