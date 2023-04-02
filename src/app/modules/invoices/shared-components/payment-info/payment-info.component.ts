import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from '../../../../shared/services/ledger/ledger.service';
import { Voucher } from '../../../../shared/collection';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
})
export class PaymentInfoComponent {
  private _invoiceId = 0;
  paymentInfo = new BehaviorSubject<Voucher[]>([]);
  @Input('invoice') 
  set invoiceId(id: number) {
    this._invoiceId = id;
    this.fetchVoucherInfo();
  }

  private fetchVoucherInfo() {
    this.api.select<Voucher[]>('invoices/paymentInfo', {id: this._invoiceId.toString()})
    .subscribe(
      (data) => this.paymentInfo.next(data),
      () => this.paymentInfo.next([])
    )
  }

  get isEmpty(): boolean {
    return this.paymentInfo.value.length === 0;
  }
  

  constructor(private api: ApiService) {}
}
