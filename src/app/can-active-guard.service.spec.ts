import { TestBed } from '@angular/core/testing';

import { CanActiveGuardService } from './can-active-guard.service';

describe('CanActiveGuardService', () => {
  let service: CanActiveGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActiveGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
