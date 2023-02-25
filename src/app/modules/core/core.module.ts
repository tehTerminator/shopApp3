import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SearchPipe } from './pipe/search.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    DropdownDirective,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    SearchPipe,
    MatIconModule,
    MatButtonModule,
  ]
})
export class CoreModule { }
