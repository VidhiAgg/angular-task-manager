import { TestBed } from '@angular/core/testing';

import { ClientLocationService } from './client-location.service';

describe('ClientLocationService', () => {
  let service: ClientLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
