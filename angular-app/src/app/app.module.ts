import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RolesComponent } from './components/roles/roles.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    ProjectsComponent,
    RolesComponent,
    EmployeeDetailsComponent,
    ProjectDetailsComponent,
    LoadingSpinnerComponent,    
  ],
  imports: [
    BrowserModule,
    RoutesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
