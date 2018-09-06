import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import {MessagesComponent} from './messages/messages.component';

describe('AppComponent', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,MessagesComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  it('# Should Create an App Component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`# Should Have as Title 'Tour of Heroes'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Tour of Heroes');
  }));

  it('# Should Render Title in a h1 Tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.nativeElement;
    expect(app.querySelector('h1').textContent).toContain('Tour of Heroes');
  }));
});
