import { Component } from '@angular/core';
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {
    console.log(Guid.create().toString())
  }
}
