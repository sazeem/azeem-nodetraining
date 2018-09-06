import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {Hero} from '../hero';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      declarations: [ DashboardComponent,LoadingSpinnerComponent,HeroSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('# Should Create Dashboard Component', () => {
    expect(component).toBeTruthy();
  });

  it('# Should Have Property Called heroes and it Should Be an Array ', () => {
    expect(component.heroes).toBeTruthy();
    expect(component.heroes).toEqual(jasmine.any(Array));
  });
});
