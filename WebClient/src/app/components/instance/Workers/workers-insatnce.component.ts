import { Component } from '@angular/core';
import {WorkersService} from "../../../services/workers.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-insatnce-workers',
  templateUrl: './workers-insatnce.component.html',
  styleUrls: ['./workers-insatnce.component.scss']
})
export class WorkersInstanceComponent {
  displayedColumns: string[] = ['name', 'email', 'phone', 'comment', 'action'];
  workers: any;

  constructor(
    private router: Router,
    private workersService: WorkersService) {
    workersService.getAllWorkers().subscribe((data: any) => {
      this.workers = data.data;
      console.log(this.workers);
    })
  }

  kick(user: any) {
    console.log(user.name + " пошел нахуй")
  }
}
