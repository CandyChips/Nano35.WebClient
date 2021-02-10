import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TokenService {
  public currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  public currentInstanceSubject: BehaviorSubject<any>;
  public currentInstance: Observable<any>;

  constructor() {

    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('token') || "");
    this.currentToken = this.currentTokenSubject.asObservable();

    this.currentInstanceSubject = new BehaviorSubject<any>(null);
    this.currentInstance = this.currentInstanceSubject.asObservable();
  }

  get currentInstanceId(): any
  {
    return this.currentInstanceSubject.value.id;
  }

  setCurrentInstance(data: any)
  {
    this.currentInstanceSubject.next(data);
  }

  removeToken() {
    localStorage.removeItem('token');
    this.currentTokenSubject.next("");
  }
}
