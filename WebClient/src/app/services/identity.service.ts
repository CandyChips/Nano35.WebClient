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

  register(command: RegisterModel): Observable<RegisterResult> {
    return this.http.post<RegisterResult>(`http://localhost:5001/Identity/register`, command);
  }

  getToken(command: AuthenticationModel): Observable<AuthenticationResult> {
    return this.http.post<AuthenticationResult>(`http://localhost:5001/Identity/authenticate`, command);
  }
}

export interface AuthenticationModel {
  login: string;
  password: string;
}

export interface AuthenticationResult {
  id: Guid;
  phone: string;
  token: string;
  error: string;
}

export interface RegisterModel {
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface RegisterResult {
  id: Guid;
  error: string;
}
