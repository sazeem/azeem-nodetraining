import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {Projects} from '../../models/projects';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Projects[];
  showSpinner:boolean = true;
  constructor(private projectService: ProjectService) { }

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
}
