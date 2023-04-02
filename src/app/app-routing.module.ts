import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { TitleStrategy } from '@angular/router';
import { TemplatePageTitleStrategy } from './shared/services/title-strategy/title-strategy';

const routes: Routes = [
  {
    path: 'user',
    title: 'Users',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'home',
    title: 'Home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin',
    title: 'Admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'cashbook',
    title: 'Cashbook',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/cashbook/cashbook.module').then(m => m.CashbookModule)
  },
  {
    path: 'invoices',
    title: 'Invoices',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule)
  },
  {
    path: 'reports',
    title: 'Report',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule) 
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ]
})
export class AppRoutingModule { }
