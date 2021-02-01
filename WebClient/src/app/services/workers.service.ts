import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { User } from '../models/user';
import {TokenService} from "./token.service";

@Injectable({ providedIn: 'root' })
export class WorkersService {
  constructor(
    private tokenService: TokenService,
    private http: HttpClient) {
  }

  getAllWorkers(roleId: Guid, instanceId: Guid): Observable<any> {
    let dest = "http://localhost:5102/Workers/GetAllWorkers?instanceId=" + instanceId.toString();

    if(!roleId.isEmpty()) {
      dest += "&regionId=" + roleId.toString();
    }

    return this.http.get<any>(dest);
  }

  getAllWorkerRoles(): Observable<any> {
    let dest = "http://localhost:5102/Workers/GetAllWorkerRoles";

    return this.http.get<any>(dest);
  }

  createWorker(data: any) {
    let dest = "http://localhost:5102/Workers/CreateWorker";

    return this.http.post<any>(dest, data);
  }
}
