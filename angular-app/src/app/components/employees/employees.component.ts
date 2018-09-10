import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {EmployeeResponse} from '../../models/employee.response';
import {Employees} from '../../models/employees';
import { RoleResponse } from '../../models/role.response';
import { ProjectResponse } from '../../models/project.response';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  employees: Employees[];
  showSpinner:boolean = true;
  totalItems:number = 0;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getEmployees();
  }  
  getEmployees(): void {
    this.projectService.getEmployees()
    .subscribe(response => {
      this.employees = response.items;
      this.showSpinner = false;
    });
  }

  add(id:number, name: string, salary:number, mentor:number): void {
    name = name.trim();
    if (!name && !salary && !mentor) { return; }
    this.projectService.addEmployee({id:id,name:name,salary:salary,reporting_manager_id:mentor} as Employees)
      .subscribe(employee => {
        this.employees.push(employee);
      });
  }
}
