import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  projectUrl = ApiService.projectUrl;

  public pageSize: number = 5;

  public _proPage: number = 1;
  public _repoPage: number = 1;

  public totalValues: number = 0;

  constructor() { }

  getPage(url): number {
    if (url === 'projects') {
      return this._proPage;
    }
    else if (url === 'repos') {
      return this._repoPage;
    }
  }
  setPage(url, val: number) {
    if (url === 'repos') {
      if (val !== this.getPage(url)) {
        this._repoPage = val;
      }
    }
    else if (url === 'projects') {
      if (val !== this.getPage(url)) {
        this._proPage = val;
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
