import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {TokenService} from "../../../../services/token.service";
import {UnitsService} from "../../../../services/units.service";
import {StorageService} from "../../../../services/storage.service";

@Component({
  selector: 'app-insatnce-warehouse-view',
  templateUrl: './warehouse-view-insatnce.component.html',
  styleUrls: ['./warehouse-view-insatnce.component.scss']
})
export class WarehouseViewInsatnceComponent implements OnInit {
  displayedColumns: string[] = ['article', 'condition', 'purchase', 'comment', 'count'];
  items: any;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private storageService: StorageService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.storageService.getAllStorageItems(this.tokenService.currentInstanceId).subscribe(
      (success: any) => {
        this.items = success;
      },
      (error: any) => {

      });
  }
}
