import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('# Should Create Message Service', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
