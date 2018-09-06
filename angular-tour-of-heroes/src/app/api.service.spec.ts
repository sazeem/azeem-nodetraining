import { ApiService } from './api.service';
import { Server } from 'net';

describe('ApiService', () => {
  let service = ApiService;

  it('# Should Create Api Service', () => {
    expect(service).toBeTruthy();
  });

  it('# Should check if url is valid',() => {
    expect(service.heroesApiUrl).toBeDefined();
  });
});
