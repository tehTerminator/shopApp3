import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Voucher } from "../../collection";
import { ApiService } from "../../services/api/api.service";
import { LedgerService } from "../../services/ledger/ledger.service";
import { NotificationService } from "../../services/notification/notification.service";

@Injectable({
    providedIn: 'root'
})
export class VoucherFormService {
    constructor(
        private ledgerService: LedgerService,
        private api: ApiService,
        private ns: NotificationService
    ) { }

    onSubmit(payload: any, editMode: boolean) {
        try {
            payload.cr = this.ledgerService.getElementByTitle(payload.cr).id;
            payload.dr = this.ledgerService.getElementByTitle(payload.dr).id;
        } catch (e) {
            this.ns.showError('Invalid CR or DR', 'Invalid Value of CR or DR');
            return;
        }

        let response = EMPTY;

        if (this.editMode) {
            response = this.api.update('vouchers', payload);
        } else {
            response = this.api.create('vouchers', payload);
        }

        this.handleResponse(response, editMode);
    }

    private handleResponse(response: Observable<Voucher>, editMode): Observable<any> {
        const word = editMode ? 'Updated' : 'Created';
        const successMessage = `Voucher ${word} successfully`;

        return response.pipe(
            tap(
                () => {
                    this.ns.showSuccess(word, successMessage);
                }
            ),
            catchError(
                (err) => {
                    this.ns.showError('Error', 'Error Occurred while Inserting Data');
                    throw new Error(err);
                }
            )
        );
    }

}