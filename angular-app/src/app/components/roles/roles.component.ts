import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../shared/services/project.service';
import {PaginationService} from '../../shared/services/pagination.service';
import {Roles} from '../../models/roles';
import { RoleResponse } from '../../models/role.response';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {  
  roleResponse:RoleResponse;

  roles: Roles[];
  showSpinner:boolean = true;
  constructor(
    private projectService: ProjectService,
    private paginationService: PaginationService
  ) { }

  ngOnInit() {
    this.getRoles();
  }
  getRoles(): void {
    this.projectService.getRoles()
    .subscribe(response => {
      this.roles = response.items;
      this.showSpinner = false;
    });
  }
  add(id:number, name: string): void {
    name = name.trim();
    if (!name && !id) { return; }
    this.projectService.addRole({id:id,name:name} as Roles)
      .subscribe(roles => {
        this.roles.push(roles);
      });
  }

}
