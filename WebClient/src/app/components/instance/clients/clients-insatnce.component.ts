import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StorageInstanceAddComponent} from "../storage/storage-add/storage-add-insatnce.component";
import {ClientsAddDialogComponent} from "./clients-add/clients-add.component";

@Component({
  selector: 'app-insatnce-clients',
  templateUrl: './clients-insatnce.component.html',
  styleUrls: ['./clients-insatnce.component.scss']
})
export class ClientsInstanceComponent {
  constructor(
    public dialog: MatDialog) {

  }

  openAddClientDialog() {
    const dialogRef = this.dialog.open(ClientsAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
