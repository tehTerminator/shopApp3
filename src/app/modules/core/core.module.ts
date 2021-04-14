import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DropdownDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    DropdownDirective,
    ReactiveFormsModule
  ]
})
export class CoreModule { }
