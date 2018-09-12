import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';
import { ProjectResponse } from '../../models/projects.response';
import { RepoResponse } from '../../models/repos.response';
import { PaginationService } from './pagination.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl = ApiService.projectUrl;

  constructor(
    private http: HttpClient,
    private paginationService:PaginationService
  ) { }

  getProjects(): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`${this.projectUrl}?page=${this.paginationService.getPage('projects')}&limit=${this.paginationService.pageSize}`)
      .pipe(tap(data => {
        this.paginationService.totalValues = data.totalItems;
      }));
  }

  getRepos(projectId,page,limit): Observable<RepoResponse> {
    return this.http.get<RepoResponse>(`${this.projectUrl}/${projectId}/repos/?page=${this.paginationService.getPage('repos')}&limit=${this.paginationService.pageSize}`)
      .pipe(tap(data => {
        this.paginationService.totalValues = data.totalItems;
      }));
  }
}
