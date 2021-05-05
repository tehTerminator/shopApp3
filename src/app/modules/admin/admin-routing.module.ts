import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ledger', loadChildren: () => import ('./pages/ledger/admin-ledger.module').then(m => m.AdminLedgerModule) },
  { path: 'products', loadChildren: () => import('./pages/products/admin-products.module').then(m => m.AdminProductsModule) },
  { path: 'pos-item', loadChildren: () => import('./pages/pos-items/admin-pos.module').then(m => m.AdminPosModule) },
  { path: '**', redirectTo: 'ledger', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
