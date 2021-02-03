import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { User } from '../models/user';
import {TokenService} from "./token.service";

@Injectable({ providedIn: 'root' })
export class ClientsService {
  constructor(
    private tokenService: TokenService,
    private http: HttpClient) {
  }

  getAllClients(instanceId: Guid): Observable<any> {
    let dest = "http://localhost:5102/Clients/GetAllClients?instanceId=" + instanceId.toString();

    return this.http.get<any>(dest);
  }

  getAllClientTypes(): Observable<any> {
    let dest = "http://localhost:5102/Clients/GetAllClientTypes";

    return this.http.get<any>(dest);
  }

  getAllClientStates(): Observable<any> {
    let dest = "http://localhost:5102/Clients/GetAllClientStates";

    return this.http.get<any>(dest);
  }

  getAllClientSalles(): Observable<any> {
    let dest = "http://localhost:5102/Clients/GetAllClientSalles";

    return this.http.get<any>(dest);
  }
  createClient(data: any): Observable<any> {
    let dest = "http://localhost:5102/Clients/CreateClient";

    return this.http.post<any>(dest, data);
  }
}
