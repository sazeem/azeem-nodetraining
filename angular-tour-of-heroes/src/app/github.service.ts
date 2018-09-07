import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GithubService {
  constructor(private http: HttpClient) {}

  getProfile(userName: string) {
    return this.http
      .get(`https://api.github.com/users/${userName}`);
  }
}
