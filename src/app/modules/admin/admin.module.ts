import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { TitleStrategy } from '@angular/router';
import { TemplatePageTitleStrategy } from './../../shared/services/title-strategy/title-strategy';

const routes: Routes = [
  { 
    path: 'ledger',
    title: 'Create / Update Ledgers',
    loadChildren: () => import ('./pages/ledger/admin-ledger.module').then(m => m.AdminLedgerModule) 
  },
  { 
    path: 'products',
    title: 'Create / Update Products',
    loadChildren: () => import('./pages/products/admin-products.module').then(m => m.AdminProductsModule) 
  },
  { 
    path: 'pos-item', 
    title: 'Create / Update Bundles',
    loadChildren: () => import('./pages/pos-items/admin-pos.module').then(m => m.AdminPosModule) 
  },
  { 
    path: '**', 
    redirectTo: 'ledger', 
    pathMatch: 'full' 
  }
];


@NgModule({
  declarations: [AdminComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{
    provide: TitleStrategy,
    useClass: TemplatePageTitleStrategy
  }]
})
export class AdminModule { }
