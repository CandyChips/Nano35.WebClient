import { Component } from '@angular/core';
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-insatnce-home',
  templateUrl: './home-insatnce.component.html',
  styleUrls: ['./home-insatnce.component.scss']
})
export class HomeInstanceComponent {
  currentInstance: any;
  constructor(private tokenService: TokenService) {
    console.log("app instance")
    this.currentInstance = tokenService.currentInstanceSubject.value;
  }
}
