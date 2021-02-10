import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {TokenService} from "../../../../services/token.service";
import {UnitsService} from "../../../../services/units.service";

@Component({
  selector: 'app-insatnce-units-view',
  templateUrl: './units-view-insatnce.component.html',
  styleUrls: ['./units-view-insatnce.component.scss']
})
export class UnitsInstanceViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'adress', 'workingFormat', 'phone', 'unitType', 'action'];
  units: any;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private unitsService: UnitsService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.unitsService.getAllUnits(this.tokenService.currentInstanceId, Guid.createEmpty()).subscribe((data: any) => {
      this.units = data;
      console.log(this.units);
    })
  }

  detailsOf(unit: any) {
    console.log(unit.name)
  }
}
