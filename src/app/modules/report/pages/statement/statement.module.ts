import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { CoreModule } from '../../../core/core.module';
import { StatementFormComponent } from './components/statement-form/statement-form.component';
import { StatementTableComponent } from './components/statement-table/statement-table.component';
import { StatementComponent } from './statement.component';
import { StatementService } from './statement.service';
import { TemplatePageTitleStrategy } from '../../../../shared/services/title-strategy/title-strategy';

const routes: Routes = [{ path: '', title: 'Account Statement', component: StatementComponent }];

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
    providers: [StatementService, {
        provide: TitleStrategy,
        useClass: TemplatePageTitleStrategy
      }],
})
export class StatementModule { }
