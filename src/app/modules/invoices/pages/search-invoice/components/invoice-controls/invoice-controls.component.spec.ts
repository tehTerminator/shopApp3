import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceControlsComponent } from './invoice-controls.component';

describe('InvoiceControlsComponent', () => {
  let component: InvoiceControlsComponent;
  let fixture: ComponentFixture<InvoiceControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
