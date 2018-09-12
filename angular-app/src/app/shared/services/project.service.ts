import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmployeeResponse } from '../../models/employee.response';
import { Employees } from '../../models/employees';
import { ProjectResponse } from '../../models/project.response';
import { Projects } from '../../models/projects';
import { RoleResponse } from '../../models/role.response';
import { Roles } from '../../models/roles';
import { ApiService } from './api.service';
import { PaginationService } from './pagination.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ProjectService {

  employeeUrl = ApiService.employeeUrl;
  projectUrl = ApiService.projectUrl;
  roleUrl = ApiService.roleUrl;

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) { }

  getEmployees(): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.employeeUrl}?page=${this.paginationService.getPage(this.employeeUrl)}&limit=${this.paginationService.pageSize}`)
      .pipe(tap(data => {
        this.paginationService.totalValues = data.totalItems;
      }));
  }

  addEmployee(employee: Employees): Observable<Employees> {
    return this.http.post<Employees>(this.employeeUrl, employee, httpOptions);
  }

  getProjects(): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`${this.projectUrl}?page=${this.paginationService.getPage(this.projectUrl)}&limit=${this.paginationService.pageSize}`)
      .pipe(tap(data => {
        this.paginationService.totalValues = data.totalItems;
      }));
  }

  addProject(project: Projects): Observable<Projects> {
    return this.http.post<Projects>(this.projectUrl, project, httpOptions);
  }

  getRoles(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.roleUrl}?page=${this.paginationService.getPage(this.roleUrl)}&limit=${this.paginationService.pageSize}`)
      .pipe(tap(data => {
        this.paginationService.totalValues = data.totalItems;
      }));
  }

  addRole(role: Roles): Observable<Roles> {
    return this.http.post<Roles>(this.roleUrl, role, httpOptions);
  }
}
