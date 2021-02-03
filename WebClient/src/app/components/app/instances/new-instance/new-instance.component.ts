import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {IdentityService} from "../../../../services/identity.service";
import {TokenService} from "../../../../services/token.service";
import {InstanceService} from "../../../../services/instance.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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
    private instanceService: InstanceService,
    public dialogRef: MatDialogRef<NewInstancesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.instanceService.getAllRegions().subscribe((regionsData: any) => {
      this.regions = regionsData;
      this.instanceService.getAllTypes().subscribe((typesData: any) => {
        this.types = typesData;

        this.identityService.getIdentity().subscribe(
          (success: any) => {
            this.form = this.formBuilder.group({
              newId: [
                Guid.create().toString(),
                [
                  Validators.required
                ]
              ],
              userId: [
                success.data.id,
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
              email: [
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
              realName: [
                "",
                [
                  Validators.required
                ]
              ],
              info: [
                "",
                [
                  Validators.required
                ]
              ],
              regionId: [
                "",
                [
                  Validators.required
                ]
              ],
              typeId: [
                "",
                [
                  Validators.required
                ]
              ]
            });
            this.isLoading = false;
          },
          (error: any) => {

          });
      });
    })
  }

  ngOnInit() {
  }

  onSubmitClick(): void {
    this.isLoading = true;
    this.instanceService.createInstance(this.form.value).subscribe((success: any) => {
      this.isLoading = false;
      this.dialogRef.close();
    }, (error: any) => {
      this.isLoading = false;
      alert(error.error.message)
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
