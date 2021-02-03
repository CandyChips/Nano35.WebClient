import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Router} from "@angular/router";
import {IdentityService} from "../../../services/identity.service";
import {InstanceService} from "../../../services/instance.service";
import {TokenService} from "../../../services/token.service";
import {Guid} from "guid-typescript";
import {ClientsAddDialogComponent} from "../../instance/clients/clients-add/clients-add.component";
import {MatDialog} from "@angular/material/dialog";
import {NewInstancesComponent} from "./new-instance/new-instance.component";

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html',
  styleUrls: ["./instances.component.scss"]
})
export class InstancesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'orgName', 'action'];
  instances: any[] | undefined;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private instanceService: InstanceService) {

    this.identityService.getIdentity()
      .subscribe((data: any) => {
      instanceService.getAllInstances(data.data.id, Guid.createEmpty(), Guid.createEmpty())
        .subscribe((data: any) => {
        this.instances = data;
      });
    })
  }

  ngOnInit() {
  }

  selectInstance(instance: any){
    this.tokenService.currentInstanceSubject.next(instance);
    this.router.navigate(["/instance"]);
  }

  openAddInstanceDialog() {
    const dialogRef = this.dialog.open(NewInstancesComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
