import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Guid } from 'guid-typescript';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class InstanceService {
  constructor(private http: HttpClient) {
  }

  getAllInstances(userId: Guid, regionId: Guid, instanceTypeId: Guid): Observable<any> {
    let dest = "http://localhost:5002/Instances/GetAllInstances?userId=" + userId.toString();

    return this.http.get<any>(dest);
  }

  getAllRegions(): Observable<any> {
    let dest = "http://localhost:5002/Instances/GetAllRegions";

    return this.http.get<any>(dest);
  }

  getAllTypes(): Observable<any> {
    let dest = "http://localhost:5002/Instances/GetAllInstanceTypes";

    return this.http.get<any>(dest);
  }

  createInstance(data: any): Observable<any> {
    let dest = "http://localhost:5002/Instances/CreateInstance";

    return this.http.post<any>(dest, data);
  }
}
