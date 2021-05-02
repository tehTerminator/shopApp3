import { TestBed } from '@angular/core/testing';

import { LedgerBalanceService } from './ledger-balance.service';

describe('LedgerBalanceService', () => {
  let service: LedgerBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LedgerBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
