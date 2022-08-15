import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'statement',
    loadChildren: () => import('./pages/statement/statement.module').then(m => m.StatementModule)
  },
  {
    path: 'day-book',
    loadChildren: () => import('./pages/day-book/day-book.module').then(m => m.DayBookModule)
  },
  { path: '**', redirectTo: 'statement', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
