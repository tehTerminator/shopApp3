import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message, NotificationService, MessageState } from './../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private ns: NotificationService) { }

  ngOnInit(): void {}

  get messages(): BehaviorSubject<Message[]> {
    return this.ns.messages;
  }

  getClass(state: MessageState): string {
    switch (state) {
      case MessageState.SUCCESS:
        return 'bg-success text-light';
      case MessageState.ALERT:
        return 'bg-warning text-light';
      case MessageState.ERROR:
        return 'bg-danger text-light';
      default:
        return 'bg-light text-dark';
    }
  }

}
