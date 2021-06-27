import { NgModule } from '@angular/core';
import { LedgerBalanceFormComponent } from './ledger-balance-form/ledger-balance-form.component';
import { LedgerBalanceComponent } from './ledger-balance.component';
import { LedgerBalanceListComponent } from './ledger-balance-list/ledger-balance-list.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../../core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { AutoSetButtons } from './auto-set-button/auto-set-button.component';

const routes: Routes = [
    { path: '', component: LedgerBalanceComponent }
];

@NgModule({
    declarations: [
        LedgerBalanceComponent,
        LedgerBalanceFormComponent,
        LedgerBalanceListComponent,
        AutoSetButtons
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LedgerBalanceModule { }