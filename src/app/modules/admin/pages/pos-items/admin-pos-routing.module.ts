import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePosItemComponent } from './pages/create-pos-item/create-pos-item.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { PosItemsComponent } from './pos-items.component';

const routes: Routes = [
    {
        path: '', component: PosItemsComponent, children: [
            { path: '', component: CreatePosItemComponent },
            { path: ':id/template', component: CreateTemplateComponent },
            { path: '**', redirectTo: 'pos-item', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPosRoutingModule { }