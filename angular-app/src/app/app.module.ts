import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { PagerComponent } from './components/pager/pager.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ReposComponent } from './components/repos/repos.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    PagerComponent,
    ReposComponent,
    LoadingSpinnerComponent,    
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
