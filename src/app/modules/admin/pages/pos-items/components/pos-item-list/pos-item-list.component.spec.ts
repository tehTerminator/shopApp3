import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosItemListComponent } from './pos-item-list.component';

describe('PosItemListComponent', () => {
  let component: PosItemListComponent;
  let fixture: ComponentFixture<PosItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
