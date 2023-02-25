import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';
import { MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';

import { CashbookRoutingModule } from './cashbook-routing.module';
import { CashbookComponent } from './cashbook.component';
import { VoucherFormComponent } from './pages/voucher-form/voucher-form.component';


@NgModule({
  declarations: [
    CashbookComponent,
    VoucherFormComponent,
  ],
  imports: [
    CommonModule,
    CashbookRoutingModule,
    CoreModule,
    MatAutocompleteModule
  ],
  providers: []
})
export class CashbookModule { }
