import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getCurrentDateString } from '../../../../../../shared/functions';
import { DayBookService } from '../../services/day-book.service';

@Component({
    selector: 'app-day-book-form',
    templateUrl: './day-book-form.component.html'
})
export class DayBookFormComponent implements OnInit {
    dateField: FormControl = new FormControl();
    loading = false;
    onSubmit = () => this.dayBookService.fetchData(this.dateField.value);
    ngOnInit(): void {
        this.dateField.setValue(getCurrentDateString());
    }

    constructor(private dayBookService: DayBookService) { }
}
