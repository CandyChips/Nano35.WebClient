import {Component, Inject} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../../services/token.service";
import {IdentityService} from "../../../../services/identity.service";
import {Router} from "@angular/router";
import {UnitsService} from "../../../../services/units.service";
import {Guid} from "guid-typescript";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StorageService} from "../../../../services/storage.service";
import {ClientsService} from "../../../../services/clients.service";

@Component({
  selector: 'app-insatnce-comings-add',
  templateUrl: './comings-add-insatnce.component.html',
  styleUrls: ['./comings-add-insatnce.component.scss']
})
export class ComingsAddInsatnceComponent {
  form!: FormGroup;

  isLoading = false;

  error = "";

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private storageService: StorageService,
    private clientService: ClientsService,
    private router: Router,
    private unitsService: UnitsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ComingsAddInsatnceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      newId: [
        Guid.create().toString(),
        [Validators.required]
      ],
      instanceId: [
        this.tokenService.currentInstanceId,
        [Validators.required]
      ],
      unitId: [
        "",
        [Validators.required]
      ],
      number: [
        "",
        [Validators.required]
      ],
      comment: [
        "",
        [Validators.required]
      ],
      clientId: [
        "",
        [Validators.required]
      ],
      details: this.formBuilder.array([])
    });
  }

  logEvent(data: any) {
    console.log(data);
  }

  get spcsArr() {
    return this.form.get('details') as FormArray;
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  addDetails(data: any) {
    this.spcsArr.push(
      this.formBuilder.group(data)
    );

    console.log(this.spcsArr.controls)
  }

  onSubmin() {
    this.isLoading = true;
    console.log(this.form.value)
    //this.storageService.createStorageItem(this.form.value)
    //  .subscribe(
    //    (data: any) => {
    //      this.dialogRef.close();
    //    },
    //    (error: any) => {
    //      this.isLoading = false;
    //      alert(error.error.message)
    //    });
  }
}
