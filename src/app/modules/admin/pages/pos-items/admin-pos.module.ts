import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosItemsComponent } from './pos-items.component';
import { PosFormComponent } from './components/pos-form/pos-form.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { PosItemListComponent } from './components/pos-item-list/pos-item-list.component';
import { TemplateListComponent } from './components/template-list/template-list.component';

@NgModule({
    declarations: [
        PosItemsComponent,
        PosFormComponent,
        TemplateFormComponent,
        PosItemListComponent,
        TemplateListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AdminPosModule { }