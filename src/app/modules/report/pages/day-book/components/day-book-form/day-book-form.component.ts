import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { getCurrentDateString } from '../../../../../../shared/functions';
import { DayBookService } from '../../services/day-book.service';

@Component({
    selector: 'app-day-book-form',
    templateUrl: './day-book-form.component.html'
})
export class DayBookFormComponent implements OnInit {
    dateField: UntypedFormControl = new UntypedFormControl();
    onSubmit = () => this.dayBookService.fetchData(this.dateField.value);
    ngOnInit(): void {
        this.dateField.setValue(getCurrentDateString());
    }

    get loading(): boolean  {
        return this.dayBookService.loading;
    }

    constructor(private dayBookService: DayBookService) { }
}
