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
  selector: 'app-sells-add',
  templateUrl: './sells-add.component.html',
  styleUrls: ['./sells-add.component.scss']
})
export class SellsAddComponent {
  form!: FormGroup;
  error = "";
  isLoading = true;

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private storageService: StorageService,
    private clientService: ClientsService,
    private router: Router,
    private unitsService: UnitsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SellsAddComponent>,
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
    this.isLoading = false;
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
    console.log(data);
    this.form.controls.unitId.setValue(data.id);
  }

  onRemoveDetail(index: number) {
    this.detailsArr.removeAt(index);
  }

  checkForm() {
    console.log(this.form.value);
  }

  onSubmin() {
    console.log(this.form.value)
    this.storageService.createComing(
      this.form.value,
      Guid.create(),
      this.tokenService.currentInstanceId)
      .subscribe(
        (data: any) => {
          this.dialogRef.close();
        });
  }
}
