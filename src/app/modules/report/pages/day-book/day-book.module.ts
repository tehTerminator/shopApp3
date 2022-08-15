import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayBookRoutingModule } from './day-book-routing.module';
import { DayBookComponent } from './day-book.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DayBookComponent
  ],
  imports: [
    CommonModule,
    DayBookRoutingModule,
    ReactiveFormsModule
  ]
})
export class DayBookModule { }
