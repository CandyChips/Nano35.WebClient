import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Router} from "@angular/router";
import {IdentityService} from "../../../services/identity.service";
import {InstanceService} from "../../../services/instance.service";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-instances',
  templateUrl: './instances.component.html'
})
export class InstancesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'orgName', 'action'];
  instances: any;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private instanceService: InstanceService) {

    instanceService.getAllInstances().subscribe((data: any) => {
      this.instances = data.data;
    });
  }

  ngOnInit() {
  }

  selectInstance(instance: any){
    this.tokenService.currentInstanceSubject.next(instance);
    this.router.navigate(["/instance"]);
  }
}
