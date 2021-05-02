import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLedgerBalanceComponent } from './list-ledger-balance.component';

describe('ListLedgerBalanceComponent', () => {
  let component: ListLedgerBalanceComponent;
  let fixture: ComponentFixture<ListLedgerBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLedgerBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLedgerBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
