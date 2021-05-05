import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreModule } from "../../../core/core.module";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductsComponent } from "./products.component";

const routes: Routes = [
    { path: '', component: ProductsComponent }
];

@NgModule({
    declarations: [
        ProductsComponent,
        ProductFormComponent,
        ProductListComponent
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
export class AdminProductsModule { }
