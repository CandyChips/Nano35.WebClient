import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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

  getAllStorageItemConditions(): Observable<any> {
    let dest = "http://localhost:5103/StorageItems/GetAllStorageItemConditions";

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

  getSubCategoriesById(parentId: Guid, instanceId: Guid) : Observable<any> {
    let dest = "http://localhost:5103/Articles/GetAllArticleCategories?instanceid=" + instanceId;
    if(parentId != Guid.createEmpty())
    {
      dest += "&parentId=" + parentId.toString();
    }
    return this.http.get<any>(dest);
  }

  getRootCategories(instanceId: Guid) : Observable<any> {
    return this.http.get<any>("http://localhost:5103/articles/GetAllArticleCategories?instanceid=" + instanceId);
  }

  createSubCategories(data: any) : Observable<any> {
    return this.http.post<any>("http://localhost:5103/articles/createCategory", data);
  }
}
