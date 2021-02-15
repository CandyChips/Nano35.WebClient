import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {TokenService} from "../../../../services/token.service";
import {UnitsService} from "../../../../services/units.service";
import {UnitsAddDialogComponent} from "../units-add/units-add-insatnce.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-insatnce-units-view',
  templateUrl: './units-view-insatnce.component.html',
  styleUrls: ['./units-view-insatnce.component.scss']
})
export class UnitsInstanceViewComponent {
  displayedColumns: string[] = ['name', 'adress', 'workingFormat', 'phone', 'unitType', 'action'];
  units: any;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private unitsService: UnitsService,
    public dialog: MatDialog) {

    this.isLoading = true;
    this.unitsService.getAllUnits(this.tokenService.currentInstanceId, Guid.createEmpty()).subscribe(
      (data: any) => {
        this.units = data;
        this.isLoading = false
      })
  }

  detailsOf(unit: any) {
    console.log(unit.name)
  }

  openAddUnitDialog() {
    const dialogRef = this.dialog.open(UnitsAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
