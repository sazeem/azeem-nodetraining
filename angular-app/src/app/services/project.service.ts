import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private employeeUrl = ApiService.employeeUrl;
  constructor(
    private http: HttpClient,
  ) { }

  getEmployees(): Observable<[]> {
    return this.http.get<[]>(this.employeeUrl);
  }
}