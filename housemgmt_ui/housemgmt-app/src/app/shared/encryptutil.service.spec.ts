import { TestBed } from '@angular/core/testing';

import { EncryptutilService } from './encryptutil.service';

describe('EncryptutilService', () => {
  let service: EncryptutilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptutilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
