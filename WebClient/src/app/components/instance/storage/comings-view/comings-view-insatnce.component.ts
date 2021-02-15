import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {TokenService} from "../../../../services/token.service";
import {UnitsService} from "../../../../services/units.service";
import {StorageService} from "../../../../services/storage.service";
import {ComingsAddInsatnceComponent} from "../comings-add/comings-add-insatnce.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-insatnce-comings-view',
  templateUrl: './comings-view-insatnce.component.html',
  styleUrls: ['./comings-view-insatnce.component.scss']
})
export class ComingsViewInsatnceComponent {
  displayedColumns: string[] = ['article', 'condition', 'purchase', 'comment', 'count'];
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

  openAddComingDialog() {
    const dialogRef = this.dialog.open(ComingsAddInsatnceComponent, {
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
