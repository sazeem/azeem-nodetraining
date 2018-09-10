import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {Employees} from '../../models/employees';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employees[];
  showSpinner:boolean = true;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getEmployees();
  }
  getEmployees(): void {
    this.projectService.getEmployees()
    .subscribe(employees => {
      this.employees = employees;
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
