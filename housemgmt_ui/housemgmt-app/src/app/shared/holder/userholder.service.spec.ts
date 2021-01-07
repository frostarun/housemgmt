import { TestBed } from '@angular/core/testing';

import { UserholderService } from './userholder.service';

describe('UserholderService', () => {
  let service: UserholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
