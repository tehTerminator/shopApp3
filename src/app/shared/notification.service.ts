import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private pMessages = new BehaviorSubject<Message[]>([]);

  constructor(private snackBar: MatSnackBar) { }

  show(title: string, text: string, state: MessageState): void {
    const createdAt = new Date();
    const message: Message = { title, text, state, createdAt };
    this.snackBar.open(text, 'DISMISS', {duration: 5000});
    this.appendMessage(message);
  }

  private appendMessage(message: Message): void {
    const newList = [message, ...this.pMessages.value];
    if ( newList.length > 10 ) {
      newList.splice(newList.length - 1, 1);
    }
    this.pMessages.next(newList);
  }

  get messages(): BehaviorSubject<Message[]> {
    return this.pMessages;
  }
}

export interface Message {
  title: string;
  text: string;
  createdAt: Date;
  state: MessageState;
}

export enum MessageState {
  SUCCESS,
  ALERT,
  ERROR
}
