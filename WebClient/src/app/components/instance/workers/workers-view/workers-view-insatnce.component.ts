import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WorkersService} from "../../../../services/workers.service";
import {Guid} from "guid-typescript";
import {IdentityService} from "../../../../services/identity.service";
import {TokenService} from "../../../../services/token.service";
import {WorkersAddDialogComponent} from "../workers-add/workers-add-insatnce.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-insatnce-workers-view',
  templateUrl: './workers-view-insatnce.component.html',
  styleUrls: ['./workers-view-insatnce.component.scss']
})
export class WorkersInstanceViewComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'comment', 'action'];
  workers: any;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private workersService: WorkersService) {
    this.isLoading = true;
    this.workersService.getAllWorkers(Guid.createEmpty(), this.tokenService.currentInstanceId).subscribe((data: any) => {
      this.workers = data;
      this.isLoading = false;
    })
  }

  kick(user: any) {
    console.log(user.name + " пошел нахуй")
  }

  openAddWorkerDialog() {
    const dialogRef = this.dialog.open(WorkersAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
