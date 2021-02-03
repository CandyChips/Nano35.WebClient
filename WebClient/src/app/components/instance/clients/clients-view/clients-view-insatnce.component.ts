import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {TokenService} from "../../../../services/token.service";
import {UnitsService} from "../../../../services/units.service";
import {StorageService} from "../../../../services/storage.service";
import {ClientsService} from "../../../../services/clients.service";

@Component({
  selector: 'app-insatnce-clients-view',
  templateUrl: './clients-view-insatnce.component.html',
  styleUrls: ['./clients-view-insatnce.component.scss']
})
export class ClientsViewInsatnceComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'email', 'type', 'state', 'salle'];
  clients: any;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private clientsService: ClientsService) {
    this.clientsService.getAllClients(this.tokenService.currentInstanceSubject.value.id).subscribe(
      (success: any) => {
        this.clients = success;
      },
      (error: any) => {

      })
  }

  ngOnInit() {
    this.load();
  }

  load() {
  }
}
