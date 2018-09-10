import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Employees } from '../models/employees';
import { EmployeeResponse } from '../models/employee.response';
import { Projects } from '../models/projects';
import { Roles } from '../models/roles';
import { tap } from 'rxjs/operators';
import { RoleResponse } from '../models/role.response';
import { ProjectResponse } from '../models/project.response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })
export class ProjectService {

  private employeeUrl = ApiService.employeeUrl;
  private projectUrl = ApiService.projectUrl;
  private roleUrl = ApiService.roleUrl;

  public _empPage: number = 1;
  public _rolePage: number = 1;
  public _proPage: number = 1;

  public totalEmployees: number = 0;
  public totalRoles: number = 0;
  public totalProjects: number = 0;

  public pageSize: number = 5;

  constructor(
    private http: HttpClient,
  ) { }

  get employeePage(): number {
    return this._empPage;
  }
  set employeePage(val: number) {
    if (val !== this.employeePage) {
      this._empPage = val;
    }
  }

  get projectPage(): number {
    return this._proPage;
  }
  set projectPage(val: number) {
    if (val !== this.projectPage) {
      this._proPage = val;
    }
  }

  get rolePage(): number {
    return this._rolePage;
  }
  set rolePage(val: number) {
    if (val !== this.rolePage) {
      this._rolePage = val;
    }
  }

  get totalEmployeePages() {
    try {
      return Math.ceil(this.totalEmployees / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
  get totalRolePages() {
    try {
      return Math.ceil(this.totalRoles / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
  get totalProjectPages() {
    try {
      return Math.ceil(this.totalProjects / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  getEmployees(): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.employeeUrl}?page=${this.employeePage}&limit=${this.pageSize}`)
      .pipe(tap(data => {
        this.totalEmployees = data.totalItems;
      }));
  }
  
  addEmployee(employee: Employees): Observable<Employees> {
    return this.http.post<Employees>(this.employeeUrl, employee, httpOptions);
  }

  getProjects(): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`${this.projectUrl}?page=${this.projectPage}&limit=${this.pageSize}`)
      .pipe(tap(data => {
        this.totalProjects = data.totalItems;
      }));
  }

  addProject(project: Projects): Observable<Projects> {
    return this.http.post<Projects>(this.projectUrl, project, httpOptions);
  }

  getRoles(): Observable<RoleResponse> {
    return this.http.get<RoleResponse>(`${this.roleUrl}?page=${this.rolePage}&limit=${this.pageSize}`)
      .pipe(tap(data => {
        this.totalRoles = data.totalItems;
      }));
  }

  addRole(role: Roles): Observable<Roles> {
    return this.http.post<Roles>(this.roleUrl, role, httpOptions);
  }
}
