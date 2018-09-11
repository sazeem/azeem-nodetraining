import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { ProjectResponse } from '../models/projects.response';
import { RepoResponse } from '../models/repos.response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl = ApiService.projectUrl;
  public _proPage: number = 1;
  public _repoPage: number = 1;
  public totalProjects: number = 0;
  public totalRepos:number = 0;
  public pageSize: number = 5;
  constructor(
    private http: HttpClient,
  ) { }

  get projectPage(): number {
    return this._proPage;
  }
  set projectPage(val: number) {
    if (val !== this.projectPage) {
      this._proPage = val;
    }
  }

  get repoPage(): number {
    return this._repoPage;
  }
  set repoPage(val: number) {
    if (val !== this.repoPage) {
      this._proPage = val;
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

  get totalRepoPages() {
    try {
      return Math.ceil(this.totalRepos / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }

  getProjects(): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`${this.projectUrl}?page=${this.projectPage}&limit=${this.pageSize}`)
      .pipe(tap(data => {
        this.totalProjects = data.totalItems;
      }));
  }

  getRepos(projectId,page,limit): Observable<RepoResponse> {
    return this.http.get<RepoResponse>(`${this.projectUrl}/${projectId}/repos/?page=${page || this.repoPage}&limit=${limit || this.pageSize}`)
      .pipe(tap(data => {
        this.totalRepos = data.totalItems;
      }));
  }
}
