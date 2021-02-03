import { Component } from '@angular/core';
import {ArticleAddDialogComponent} from "./article-add/article-add.component";
import {MatDialog} from "@angular/material/dialog";
import {StorageInstanceAddComponent} from "./storage-add/storage-add-insatnce.component";
import {ComingsAddInsatnceComponent} from "./comings-add/comings-add-insatnce.component";

@Component({
  selector: 'app-insatnce-storage',
  templateUrl: './storage-insatnce.component.html',
  styleUrls: ['./storage-insatnce.component.scss']
})
export class StorageInstanceComponent {
  constructor(
    public dialog: MatDialog) {

  }
  alert(message: string) {
    alert(message)
  }

  openAddStorageItemDialog() {
    const dialogRef = this.dialog.open(StorageInstanceAddComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openAddComingDialog() {
    const dialogRef = this.dialog.open(ComingsAddInsatnceComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
