import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { User } from '../models/user';
import {IdentityService} from "./identity.service";

@Injectable({ providedIn: 'root' })
export class TokenService {
  public currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  constructor(
    private http: HttpClient,
    private identityService: IdentityService) {
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token') || "");
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  addToken(token: Guid) {
    localStorage.setItem("token", token.toString());
  }

  removeToken() {
    localStorage.removeItem('token');
    this.currentTokenSubject.next("");
  }
}
