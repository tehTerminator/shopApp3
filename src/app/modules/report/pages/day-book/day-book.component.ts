import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getCurrentDateString } from '../../../../shared/functions';
import { ApiService } from './../../.../../../../shared/services/api/api.service';

@Component({
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.css']
})
export class DayBookComponent{}

