import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SearchPipe } from './pipe/search.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    DropdownDirective,
    SearchPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    DropdownDirective,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    SearchPipe,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class CoreModule { }
