import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Guid} from "guid-typescript";
import {TokenService} from "../../../../services/token.service";
import {ClientsService} from "../../../../services/clients.service";
import {IdentityService} from "../../../../services/identity.service";


@Component({
  selector: 'app-insatnce-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.scss']
})
export class ClientsAddDialogComponent {
  form!: FormGroup;
  clientTypes: any;
  clientStates: any;
  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private clientsServie: ClientsService,
    private identityService: IdentityService,
    private tokenService: TokenService,
    public dialogRef: MatDialogRef<ClientsAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.clientsServie.getAllClientStates().subscribe(
      (success: any) => {
        this.clientStates = success;
        this.clientsServie.getAllClientTypes().subscribe(
          (success: any) => {
            this.clientTypes = success;
            this.identityService.getIdentity().subscribe(
              (success: any) => {
                this.form = this.formBuilder.group({
                  newId: [
                    Guid.create().toString(),
                    [Validators.required]
                  ],
                  instanceId: [
                    this.tokenService.currentInstanceId,
                    [Validators.required]
                  ],
                  userId: [
                    success.data.id,
                    [Validators.required]
                  ],
                  name: [
                    "",
                    [Validators.required]
                  ],
                  email: [
                    "",
                    [Validators.required]
                  ],
                  phone: [
                    "",
                    [Validators.required]
                  ],
                  clientTypeId: [
                    "",
                    [Validators.required]
                  ],
                  clientStateId: [
                    "",
                    [Validators.required]
                  ],
                  salle: [
                    0,
                    [Validators.required]
                  ]
                });
                this.isLoading = false;
              },
              (error: any) => {

              });
          },
          (error: any) => {

          });
      },
      (error: any) => {

      });
  }

  onSubmitClick(): void {
    this.isLoading = true;
    this.clientsServie.createClient(this.form.value).subscribe((success: any) => {
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
