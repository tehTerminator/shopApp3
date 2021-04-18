import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DefaultComponent } from './pages/default/default.component';
import { LedgerComponent } from './pages/ledger/ledger.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', component: DefaultComponent },
    { path: 'ledger', component: LedgerComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
