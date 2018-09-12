import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {PaginationService} from '../../shared/services/pagination.service';
import {Repo} from '../../models/repos';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {
  repos: Repo[];
  _projectId:number;
  showSpinner:boolean;

  get projectId(){
     return this._projectId;
  }
  set projectId(val: number) {
    if (val !== this.projectId) {
      this._projectId = val;
    }
  }
  
  page:number;
  limit:number;

  constructor(
    private projectService: ProjectService,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {    
    this.login(this.projectId);
  }
  login(projectId=1):void {
    this.projectId = projectId;
    this.getRepos();
  }
  getRepos(): void {
    this.showSpinner = true;
    this.projectService.getRepos(this.projectId,this.page,this.limit)
    .subscribe(response => {
      this.repos = response.items;
      this.showSpinner = false;
    });
  }
}
