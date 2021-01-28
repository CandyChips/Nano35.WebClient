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

  private addHeaders(): HttpHeaders
  {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return headers.set('x-instance-id', this.tokenService.currentInstanceSubject.value.id);
  }

  getAllUnits(): Observable<any> {
    return this.http.get<any>(`http://localhost:5002/Units/GetAllUnits`, {headers: this.addHeaders()});
  }
}
