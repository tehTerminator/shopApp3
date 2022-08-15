import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayBookRoutingModule } from './day-book-routing.module';
import { DayBookComponent } from './day-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DayBookFormComponent } from './components/day-book-form/day-book-form.component';
import { DayBookTableComponent } from './components/day-book-table/day-book-table.component';
import { DayBookService } from './services/day-book.service';


@NgModule({
  declarations: [
    DayBookComponent,
    DayBookFormComponent,
    DayBookTableComponent
  ],
  imports: [
    CommonModule,
    DayBookRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    DayBookService
  ]
})
export class DayBookModule { }
