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

  addInstanceIdToHeader(instanceId: Guid, value: HttpHeaders) : HttpHeaders {
    return value.append("instanceId", instanceId.toString());
  }

  addNewIdToHeader(newId: Guid, value: HttpHeaders) : HttpHeaders {
    return value.append("newId", newId.toString());
  }

  addWorkerIdToHeader(workerId: Guid, value: HttpHeaders) : HttpHeaders {
    return value.append("workerId", workerId.toString());
  }

  getAllStorageItems(instanceId: Guid): Observable<any> {
    let dest = "http://localhost:5003/StorageItems/GetAllStorageItems?instanceId=" + instanceId.toString()

    return this.http.get<any>(dest);
  }

  getAllStorageItemById(id: Guid): Observable<any> {
    let dest = "http://localhost:5003/StorageItems/GetStorageItemById?Id=" + id.toString()

    return this.http.get<any>(dest);
  }

  getAllStorageItemConditions(): Observable<any> {
    let dest = "http://localhost:5003/StorageItems/GetAllStorageItemConditions";

    return this.http.get<any>(dest);
  }

  getAllArticles(instanceId: Guid): Observable<any> {
    let dest = "http://localhost:5003/Articles/GetAllArticles?instanceId=" + instanceId.toString()

    return this.http.get<any>(dest);
  }

  getAllArticleBrands(instanceId: Guid, categoryId: Guid): Observable<any> {
    let dest = "http://localhost:5003/Articles/GetAllArticleBrands?instanceId=" + instanceId + "&categoryId=" + categoryId;

    return this.http.get<any>(dest);
  }

  getAllArticleModels(instanceId: Guid, categoryId: Guid): Observable<any> {
    let dest = "http://localhost:5003/Articles/GetAllArticleModels?instanceId=" + instanceId + "&categoryId=" + categoryId;
    return this.http.get<any>(dest);
  }

  createStorageItem(data: any) : Observable<any> {
    let dest = "http://localhost:5003/StorageItems/CreateStorageItem";

    return this.http.post<any>(dest, data);
  }

  createArticle(data: any) : Observable<any> {
    let dest = "http://localhost:5003/Articles/CreateArticle";

    return this.http.post<any>(dest, data);
  }

  createComing(data: any, newId: Guid, instanceId: Guid) : Observable<any> {
    let dest = "http://localhost:5003/warehouse/CreateComing";
    let opts = {headers:
        this.addNewIdToHeader(newId,
          this.addInstanceIdToHeader(instanceId,
            new HttpHeaders()
          ))};
    return this.http.post<any>(dest, data, opts);
  }

  getAllComings(instanceId: Guid) : Observable<any> {
    let dest = "http://localhost:5003/Warehouse/GetAllComings?InstanceId=" + instanceId;

    return this.http.get<any>(dest);
  }

  getComingDetailsById(comingId: Guid) : Observable<any> {
    let dest = "http://localhost:5003/Warehouse/GetComingDetailsById?Id=" + comingId;

    return this.http.get<any>(dest);
  }

  createSelle(data: any, newId: Guid, instanceId: Guid) : Observable<any> {
    let dest = "http://localhost:5003/warehouse/CreateSell";
    let opts = {headers:
        this.addNewIdToHeader(newId,
          this.addInstanceIdToHeader(instanceId,
            new HttpHeaders()
          ))};
    return this.http.post<any>(dest, data, opts);
  }

  getAllSells(instanceId: Guid) : Observable<any> {
    let dest = "http://localhost:5003/Warehouse/GetAllSells?InstanceId=" + instanceId;

    return this.http.get<any>(dest);
  }

  getSelleDetailsById(selleId: Guid) : Observable<any> {
    let dest = "http://localhost:5003/Warehouse/GetSelleDetailsById?Id=" + selleId;

    return this.http.get<any>(dest);
  }

  getSubCategoriesById(parentId: Guid) : Observable<any> {
    let dest = "http://localhost:5003/Articles/GetAllArticleCategories?parentId=" + parentId;
    return this.http.get<any>(dest);
  }

  getRootCategories(instanceId: Guid) : Observable<any> {
    return this.http.get<any>("http://localhost:5003/articles/GetAllArticleCategories?instanceid=" + instanceId);
  }

  createSubCategories(data: any) : Observable<any> {
    return this.http.post<any>("http://localhost:5003/articles/createCategory", data);
  }
}
