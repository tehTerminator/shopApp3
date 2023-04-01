import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { PaymentInfo } from './../../../../shared/interface/invoice.interface';
import { BehaviorSubject } from 'rxjs';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from '../../../../shared/services/ledger/ledger.service';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
})
export class PaymentInfoComponent implements OnChanges {
  @Input('invoiceId') id = 0;

//   paymentInfo = new BehaviorSubject<PaymentInfo[]>([]);

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes.id.currentValue !== changes.id.previousValue) {
//         console.log(id)
//       this.api
//         .select<PaymentInfo[]>(
//           'invoices/paymentInfo/' + changes.id.currentValue
//         )
//         .subscribe(
//           (data) => this.paymentInfo.next(data),
//           (err) => {
//             this.paymentInfo.next([]);
//             console.error(err);
//           }
//         );
//     }
//   }

//   get amountPaid(): number {
//     let info = this.paymentInfo.value;
//     if (info.length === 0) {
//         return 0;
//     }

//     let amount = 0;
//     info.forEach(function(item) {
//         amount += item.amount;
//     });

//     return amount;
//   }

//   get paymentStatus(): string {
//     if (this.amountPaid === 0) {
//         return 'UNPAID';
//     } 

//     if (this.amountPaid === this.invoiceStore.invoice.value.amount) {
//         return 'PAID';
//     }

//     return 'OVERPAID';
//   }

  constructor(private api: ApiService,
    private invoiceStore: InvoiceStoreService,
    private ledgerService: LedgerService) {}
}
