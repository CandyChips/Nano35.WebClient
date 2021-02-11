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
      intsanceId: [
        this.tokenService.currentInstanceId,
        [Validators.required]
      ],
      unitId: [
        "",// ToDo FIXXXXXX
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

  get detailsArr() {
    return this.form.get('details') as FormArray;
  }

  handleInput(event: KeyboardEvent) : void {
    event.stopPropagation();
  }

  addDetails(data: any) {
    console.log(data);
    this.detailsArr.push(
      this.formBuilder.group(data)
    );
  }

  updateUnit(data: any) {
    this.form.controls.unitId.setValue(data.id);
  }

  onRemoveDetail(index: number) {
    this.detailsArr.removeAt(index);
  }

  onSubmin() {
    console.log(this.form.value)
    this.storageService.createComing(this.form.value)
      .subscribe(
        (data: any) => {
          this.dialogRef.close();
        });
  }
}
