import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { StatementFormComponent } from './components/statement-form/statement-form.component';
import { StatementTableComponent } from './components/statement-table/statement-table.component';
import { StatementComponent } from './statement.component';
import { StatementService } from './statement.service';

const routes: Routes = [{ path: '', component: StatementComponent }];

@NgModule({
    declarations: [
        StatementComponent,
        StatementFormComponent,
        StatementTableComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: [StatementService]
})
export class StatementModule { }
