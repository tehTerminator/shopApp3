import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: 'ledger', loadChildren: () => import ('./pages/ledger/admin-ledger.module').then(m => m.AdminLedgerModule) },
  { path: 'products', loadChildren: () => import('./pages/products/admin-products.module').then(m => m.AdminProductsModule) },
  { path: 'pos-item', loadChildren: () => import('./pages/pos-items/admin-pos.module').then(m => m.AdminPosModule) },
  { path: 'stocks', loadChildren: () => import('./pages/stocks/stocks.module').then(m => m.StocksModule) },
  { path: '**', redirectTo: 'ledger', pathMatch: 'full' }
];


@NgModule({
  declarations: [AdminComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModule { }
