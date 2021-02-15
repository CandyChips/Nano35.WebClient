import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Router} from "@angular/router";
import {Guid} from "guid-typescript";
import {InstanceService} from "../../../../services/instance.service";
import {IdentityService} from "../../../../services/identity.service";
import {TokenService} from "../../../../services/token.service";
import {InstanceAddDialogComponent} from "../new-instance/new-instance.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-view-instance',
  templateUrl: './view-instance.component.html',
  styleUrls: ["./view-instance.component.scss"]
})
export class ViewInstancesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'orgName', 'action'];
  instances: any[] | undefined;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private instanceService: InstanceService,
    public dialog: MatDialog) {

    this.isLoading = true;
    this.identityService.getIdentity().subscribe(
      (data: any) => {
      instanceService.getAllInstances(data.data.id, Guid.createEmpty(), Guid.createEmpty()).subscribe(
        (data: any) => {
        this.instances = data;
        this.isLoading = false;
      });
    })
  }

  ngOnInit() {
  }

  selectInstance(instance: any){
    this.tokenService.setCurrentInstance(instance);
    this.router.navigate(["/instance"]);
  }

  openAddInstanceDialog() {
    const dialogRef = this.dialog.open(InstanceAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
