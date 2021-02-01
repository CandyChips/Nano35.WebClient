import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { User } from '../models/user';
import {TokenService} from "./token.service";

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(
    private tokenService: TokenService,
    private http: HttpClient) {
  }

  getAllStorageItems(instanceId: Guid): Observable<any> {
    let dest = "http://localhost:5103/StorageItems/GetAllStorageItems?instanceId=" + instanceId.toString()

    return this.http.get<any>(dest);
  }

  getAllArticles(instanceId: Guid): Observable<any> {
    let dest = "http://localhost:5103/Articles/GetAllArticles?instanceId=" + instanceId.toString()

    return this.http.get<any>(dest);
  }

  getAllArticleTypes(): Observable<any> {
    let dest = "http://localhost:5103/Articles/GetAllArticleTypes";

    return this.http.get<any>(dest);
  }

  createStorageItem(data: any) {
    let dest = "http://localhost:5103/StorageItems/CreateStorageItem";

    return this.http.post<any>(dest, data);
  }

  createArticle(data: any) {
    let dest = "http://localhost:5103/Articles/CreateArticle";

    return this.http.post<any>(dest, data);
  }
}
