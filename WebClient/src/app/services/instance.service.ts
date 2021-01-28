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

  getAllInstances(): Observable<any> {
    return this.http.get<any>(`http://localhost:5002/Instances/GetAllInstances`);
  }
}
