import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerBalanceFormComponent } from './ledger-balance-form.component';

describe('LedgerBalanceFormComponent', () => {
  let component: LedgerBalanceFormComponent;
  let fixture: ComponentFixture<LedgerBalanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedgerBalanceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerBalanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
