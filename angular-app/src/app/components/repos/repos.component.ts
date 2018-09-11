import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {Repo} from '../../models/repos';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {
  repos: Repo[];
  projectId:number;
  showSpinner:boolean;

  page:number;
  limit:number;

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.page = params['page'];
      this.limit = params['limit'];      
    });
  }
  login(projectId):void {
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
