import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {TokenService} from "../../../../services/token.service";
import {UnitsService} from "../../../../services/units.service";
import {StorageService} from "../../../../services/storage.service";
import {ComingsAddInsatnceComponent} from "../comings-add/comings-add-insatnce.component";
import {MatDialog} from "@angular/material/dialog";
import {SellsAddComponent} from "../selles-add/sells-add.component";

@Component({
  selector: 'app-sells-view',
  templateUrl: './sells-view.component.html',
  styleUrls: ['./sells-view.component.scss']
})
export class SellsViewComponent {
  displayedColumns: string[] = ['number', 'date', 'count', 'actions'];
  items: any;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private storageService: StorageService,
    public dialog: MatDialog) {
    this.isLoading = true;
    this.storageService.getAllComings(this.tokenService.currentInstanceId).subscribe(
      (success: any) => {
        this.items = success;
        this.isLoading = false;
      });
  }

  openAddSelleDialog() {
    const dialogRef = this.dialog.open(SellsAddComponent, {
      width: '900px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.storageService.getAllComings(this.tokenService.currentInstanceId).subscribe(
        (success: any) => {
          this.items = success;
          this.isLoading = false;
        });
    });

  }
}
