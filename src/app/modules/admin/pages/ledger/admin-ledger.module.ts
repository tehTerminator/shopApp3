import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../../core/core.module';
import { LedgerFormComponent } from './ledger-form/ledger-form.component';
import { LedgerListComponent } from './ledger-list/ledger-list.component';
import { LedgerComponent } from './ledger.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: LedgerComponent }
];

@NgModule({
    declarations: [
        LedgerFormComponent,
        LedgerListComponent,
        LedgerComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AdminLedgerModule {}
