import { TestBed } from '@angular/core/testing';

import { GetGreetingService } from './get-greeting.service';

describe('GetGreetingService', () => {
  let service: GetGreetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGreetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
