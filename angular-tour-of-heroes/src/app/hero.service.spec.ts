import { TestBed, async, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HeroService', () => {
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

  it('# Should Be Created', inject([HeroService],
    (service: HeroService) => {
      expect(service).toBeTruthy();
  }));

  it('# Should Have getHeroes Method', inject([HeroService],
    (service: HeroService) => {
      expect(service.getHeroes()).toBeTruthy();
  }));

  it('# Should Have a from GetHeroes Result', inject([HeroService],
    (service: HeroService) => {
      service.getHeroes().subscribe(value => {
        expect(value).toBeTruthy();
      })
  }));
});
