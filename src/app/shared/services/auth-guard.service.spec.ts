import { TestBed } from '@angular/core/testing';

import { AuthgaurdService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthgaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthgaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
