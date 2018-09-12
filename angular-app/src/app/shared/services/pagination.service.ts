import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  employeeUrl = ApiService.employeeUrl;
  projectUrl = ApiService.projectUrl;
  roleUrl = ApiService.roleUrl;

  public pageSize: number = 5;

  public _empPage: number = 1;
  public _rolePage: number = 1;
  public _proPage: number = 1;

  public totalValues: number = 0;

  constructor() { }

  getPage(url): number {
    if (url === this.employeeUrl) {
      return this._empPage;
    }
    else if (url === this.projectUrl) {
      return this._proPage;
    }
    else if (url === this.roleUrl) {
      return this._rolePage;
    }
  }
  setPage(url, val: number) {
    if (url === this.employeeUrl) {
      if (val !== this.getPage(url)) {
        this._empPage = val;
      }
    }
    else if (url === this.projectUrl) {
      if (val !== this.getPage(url)) {
        this._proPage = val;
      }
    }
    else if (url === this.roleUrl) {
      if (val !== this.getPage(url)) {
        this._rolePage = val;
      }
    }
  }

  get totalPages() {
    try {
      return Math.ceil(this.totalValues / this.pageSize);
    } catch (e) {
      console.error(e);
      return 0;
    }
  }
}
