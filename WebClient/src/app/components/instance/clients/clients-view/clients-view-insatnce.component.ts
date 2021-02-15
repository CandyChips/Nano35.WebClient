import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {TokenService} from "../../../../services/token.service";
import {UnitsService} from "../../../../services/units.service";
import {StorageService} from "../../../../services/storage.service";
import {ClientsService} from "../../../../services/clients.service";
import {ClientsAddDialogComponent} from "../clients-add/clients-add.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-insatnce-clients-view',
  templateUrl: './clients-view-insatnce.component.html',
  styleUrls: ['./clients-view-insatnce.component.scss']
})
export class ClientsViewInsatnceComponent {
  displayedColumns: string[] = ['name', 'phone', 'email', 'type', 'state', 'salle'];
  clients: any;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private clientsService: ClientsService,
    public dialog: MatDialog) {
    this.isLoading = true;
    this.clientsService.getAllClients(this.tokenService.currentInstanceId).subscribe(
      (success: any) => {
        this.clients = success;
        console.log(success)
        this.isLoading = false;
      })
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
