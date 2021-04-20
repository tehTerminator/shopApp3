import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DefaultComponent } from './pages/default/default.component';
import { LedgerComponent } from './pages/ledger/ledger.component';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: '', component: DefaultComponent },
  { path: 'ledger', component: LedgerComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'pos-item', loadChildren: () => import('./pages/pos-items/admin-pos.module').then(m => m.AdminPosModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
