import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

fdescribe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('# Should Be Created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
