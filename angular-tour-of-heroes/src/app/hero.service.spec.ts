import { TestBed, async, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HeroService
      ],
    });
  });

  it('# Should Be Created', inject([HttpTestingController,HeroService], (httpMock: HttpTestingController,service: HeroService) => {
    expect(service).toBeTruthy();
  }));

});
