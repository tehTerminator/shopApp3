import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { DayBookComponent } from './day-book.component';
import { TemplatePageTitleStrategy } from '../../../../shared/services/title-strategy/title-strategy';

const routes: Routes = [{ path: '', title: 'Day-Book', component: DayBookComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{
    provide: TitleStrategy,
    useClass: TemplatePageTitleStrategy
  }]
})
export class DayBookRoutingModule { }
