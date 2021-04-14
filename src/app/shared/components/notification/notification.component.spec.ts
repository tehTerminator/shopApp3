import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageState } from '../../shared/notification.service';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return red', () => {
    expect(component.getClass(MessageState.ALERT)).toEqual('orange');
    expect(component.getClass(MessageState.SUCCESS)).toEqual('green');
    expect(component.getClass(MessageState.ERROR)).toEqual('red');
  });

});
