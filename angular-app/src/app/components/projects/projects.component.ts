import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {PaginationService} from '../../shared/services/pagination.service';
import {Projects} from '../../models/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Projects[];
  showSpinner:boolean = true;
  constructor(
    private projectService: ProjectService,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.getProjects();
  }
  getProjects(): void {
    this.projectService.getProjects()
    .subscribe(response => {
      this.projects = response.items;
      this.showSpinner = false;
    });
  }

  add(id:number, name: string, duration:number, cost:number, manager:number): void {
    name = name.trim();
    if (!name && !duration && !cost && !manager && !id) { return; }
    this.projectService.addProject({id:id,name:name,duration:duration,cost:cost,manager_id:manager} as Projects)
      .subscribe(project => {
        this.projects.push(project);
      });
  }
}
