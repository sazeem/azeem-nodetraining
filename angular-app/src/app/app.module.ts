import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RolesComponent } from './components/roles/roles.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PagerComponent } from './shared/pager/pager.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    ProjectsComponent,
    RolesComponent,
    EmployeeDetailsComponent,
    ProjectDetailsComponent,
    LoadingSpinnerComponent,
    PagerComponent,       
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
