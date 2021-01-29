import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WorkersService} from "../../../../services/workers.service";
import {Guid} from "guid-typescript";
import {IdentityService} from "../../../../services/identity.service";
import {TokenService} from "../../../../services/token.service";

@Component({
  selector: 'app-insatnce-workers-view',
  templateUrl: './workers-view-insatnce.component.html',
  styleUrls: ['./workers-view-insatnce.component.scss']
})
export class WorkersInstanceViewComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'comment', 'action'];
  workers: any;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private workersService: WorkersService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.workersService.getAllWorkers(Guid.createEmpty(), this.tokenService.currentInstanceSubject.value.id).subscribe((data: any) => {
      this.workers = data;
      console.log(data);
    })
  }

  kick(user: any) {
    console.log(user.name + " пошел нахуй")
  }
}
