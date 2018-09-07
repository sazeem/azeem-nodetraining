import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RolesComponent }   from '../components/roles/roles.component';
import { ProjectsComponent }   from '../components/projects/projects.component';
import { EmployeesComponent }   from '../components/employees/employees.component';
import { EmployeeDetailsComponent }   from '../components/employee-details/employee-details.component';
import { ProjectDetailsComponent }   from '../components/project-details/project-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'roles', component: RolesComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employees/detail/:id', component: EmployeeDetailsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/detail/:id', component: ProjectDetailsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutesModule { }
