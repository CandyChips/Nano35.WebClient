import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WorkersService} from "../../../../services/workers.service";

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
    private workersService: WorkersService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.workersService.getAllWorkers().subscribe((data: any) => {
      this.workers = data.data;
      console.log(this.workers);
    })
  }

  kick(user: any) {
    console.log(user.name + " пошел нахуй")
  }
}