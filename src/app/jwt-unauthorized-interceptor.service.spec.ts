import { TestBed } from '@angular/core/testing';

import { JwtUnauthorizedInterceptorService } from './jwt-unauthorized-interceptor.service';

describe('JwtUnauthorizedInterceptorService', () => {
  let service: JwtUnauthorizedInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtUnauthorizedInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
