import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class IdentityService {
  constructor(private http: HttpClient) {
  }

  register(command: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5101/Identity/register`, command);
  }

  getToken(command: any): Observable<any> {
    return this.http.post<any>(`http://localhost:5101/Identity/authenticate`, command);
  }

  getIdentity(): Observable<any> {
    return this.http.get<any>(`http://localhost:5101/Identity/GetUserFromToken`);
  }
}
