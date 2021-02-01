import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { User } from '../models/user';
import {TokenService} from "./token.service";

@Injectable({ providedIn: 'root' })
export class UnitsService {
  constructor(
    private tokenService: TokenService,
    private http: HttpClient) {
  }

  getAllUnits(instanceId: Guid, unitTypeId: Guid): Observable<any> {
    let dest = "http://localhost:5102/Units/GetAllUnits?instanceId=" + instanceId.toString();

    if(!unitTypeId.isEmpty()) {
      dest += "&regionId=" + unitTypeId.toString();
    }

    return this.http.get<any>(dest);
  }

  getAllUnitTypes(): Observable<any> {
    let dest = "http://localhost:5102/Units/GetAllUnitTypes";

    return this.http.get<any>(dest);
  }

  createUnit(data: any) {
    let dest = "http://localhost:5102/Units/CreateUnit";

    return this.http.post<any>(dest, data);
  }
}
