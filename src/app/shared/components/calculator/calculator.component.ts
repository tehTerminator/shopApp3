import { Component } from '@angular/core';


@Component({
  selector: 'app-calculator',
  template: `
    <h2 mat-dialog-title>Calculator</h2>
    <div mat-dialog-content>
      <app-evaluator></app-evaluator>
      <app-currency-form></app-currency-form>
      <app-currency-table></app-currency-table>
    </div>
  `,
  styles: ['']
})
export class CalculatorComponent {}

