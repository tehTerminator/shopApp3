import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getCurrentDateString } from '../../../../shared/functions';
import { ApiService } from './../../.../../../../shared/services/api/api.service';

@Component({
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.css']
})
export class DayBookComponent implements OnInit {
  dateField: FormControl = new FormControl();
  dayBook: Entry[] = [];
  loading = false;

  ngOnInit(): void {
    this.dateField.setValue(getCurrentDateString());
  }

  onSubmit(): void {
    this.loading = true;
    this.api.select<Entry[]>('day-book', {date: this.dateField.value})
    .subscribe(
      (data => {
        this.loading = false;
        this.dayBook = data;
      }),
      () => {
        this.loading = false;
      }
    );
  }

  constructor(private api: ApiService) { }
}

interface Entry {
  creditor: string;
  debtor: string;
  amount: number;
}