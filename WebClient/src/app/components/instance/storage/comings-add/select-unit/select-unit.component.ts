import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {map, startWith} from "rxjs/operators";
import {ClientsService} from "../../../../../services/clients.service";
import {TokenService} from "../../../../../services/token.service";
import {ClientsAddDialogComponent} from "../../../clients/clients-add/clients-add.component";
import {UnitsService} from "../../../../../services/units.service";
import {Guid} from "guid-typescript";
import {UnitsInstanceAddComponent} from "../../../units/units-add/units-add-insatnce.component";

@Component({
  selector: 'app-select-unit',
  templateUrl: './select-unit.component.html',
  styleUrls: ['./select-unit.component.scss']
})
export class SelectUnitComponent {
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  units: any;
  filteredUnits: any;

  unitFilterControl = new FormControl();
  selectUnitControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private unitsService: UnitsService) {

    this.unitsService.getAllUnits(this.tokenService.currentInstanceId, Guid.createEmpty())
      .subscribe((success: any) => {
        this.units = success;
        this.filteredUnits = this.unitFilterControl.valueChanges
          .pipe(
            startWith(''),
            map(value =>
              this.units.filter((option: any) =>
                (option.name.toLowerCase() + " " + option.adress.toLowerCase())
                  .includes(value.toLowerCase()))
            ));
        this.selectUnitControl.valueChanges
          .subscribe((data: any) => {
            this.dataChanged.emit(data);
        })
      });
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  openAddUnitDialog() {
    const dialogRef = this.dialog.open(UnitsInstanceAddComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.unitsService.getAllUnits(this.tokenService.currentInstanceId, Guid.createEmpty()).subscribe((success: any) => {
          this.units = success;
          this.filteredUnits = this.unitFilterControl.valueChanges.pipe(
              startWith(''),
              map(value =>
                this.units.filter((option: any) =>
                  (option.name.toLowerCase() + " " + option.adress.toLowerCase()).includes(value.toLowerCase()))));
          this.selectUnitControl.valueChanges.subscribe((data: any) => {
              this.dataChanged.emit(data);
          });
      });
    });
  }
}
