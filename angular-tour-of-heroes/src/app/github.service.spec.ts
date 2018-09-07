import { GithubService } from './github.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('GithubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
  });
  it('should get profile data of user', () => {
    const profileInfo = { login: 'blacksonic', id: 602571, name: 'Gábor Soós' };
    const githubService = TestBed.get(GithubService);
    const http = TestBed.get(HttpTestingController);
    let profileResponse;
  
    githubService.getProfile('blacksonic').subscribe((response) => {
      profileResponse = response;
      console.log(response);
    });    
    http.expectOne('https://api.github.com/users/blacksonic').flush(profileInfo);
    expect(profileResponse).toEqual(profileInfo);
  });
});
