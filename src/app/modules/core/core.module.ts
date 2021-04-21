import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SearchPipe } from './pipe/search.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    SearchPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    DropdownDirective,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    SearchPipe
  ]
})
export class CoreModule { }
