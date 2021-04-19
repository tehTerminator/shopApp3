import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../../.../../../core/core.module';
import { PosItemsComponent } from './pos-items.component';
import { PosFormComponent } from './components/pos-form/pos-form.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { PosItemListComponent } from './components/pos-item-list/pos-item-list.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { AdminPosRoutingModule } from './admin-pos-routing.module';
import { CreatePosItemComponent } from './pages/create-pos-item/create-pos-item.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';

@NgModule({
    declarations: [
        PosItemsComponent,
        PosFormComponent,
        TemplateFormComponent,
        PosItemListComponent,
        TemplateListComponent,
        CreatePosItemComponent,
        CreateTemplateComponent
    ],
    imports: [
        CommonModule,
        AdminPosRoutingModule,
        CoreModule
    ]
})
export class AdminPosModule { }