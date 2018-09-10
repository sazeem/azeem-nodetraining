import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {Employees} from '../models/employees';
import {Projects} from '../models/projects';
import {Roles} from '../models/roles';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private employeeUrl = ApiService.employeeUrl;
  private projectUrl = ApiService.projectUrl;
  private roleUrl = ApiService.roleUrl;
  constructor(
    private http: HttpClient,
  ) { }

  getEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.employeeUrl);
  }
  addEmployee(employee: Employees): Observable<Employees> {
    return this.http.post<Employees>(this.employeeUrl, employee, httpOptions);
  }
  getProjects(): Observable<Projects[]> {
    return this.http.get<Projects[]>(this.projectUrl);
  }
  addProject(project: Projects): Observable<Projects> {
    return this.http.post<Projects>(this.projectUrl, project, httpOptions);
  }
  getRoles(): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.roleUrl);
  }
  addRole(role: Roles): Observable<Roles> {
    return this.http.post<Roles>(this.roleUrl, role, httpOptions);
  }
}
