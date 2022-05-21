import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { retry } from 'rxjs/operators';
import { getCurrentDateString } from '../../../../../../shared/functions';
import { ApiService } from '../../../../../../shared/services/api/api.service';
import { SearchInvoiceStoreService } from '../../search-invoice-store.service';

@Component({
    selector: 'app-search-by-date-form',
    templateUrl: './search-by-date.component.html',
    styles: ['']
})
export class SearchByDateComponent implements OnInit {
    searchForm: FormGroup = new FormGroup({});
    users: UserData[] = [];

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group({
            createdAt: [getCurrentDateString(), [Validators.required]],
            userId: [0, [Validators.required, Validators.min(1)]]
        });
        this.api.select<UserData[]>('users')
            .pipe(retry(3))
            .subscribe((data) => this.users = data);

        try {
            const id = Number(this.route.snapshot.paramMap.get('id'));
            console.log('id : ', id);
            if (!!id) {
                this.store.selectInvoice(id);
            }
        } catch (e) {
            console.log('No Param Found');
        }
    }

    onSubmit(): void {
        this.store.fetchInvoice(
            this.createdAtField.value,
            this.userIdField.value
        );
    }

    get createdAtField(): FormControl {
        return this.searchForm.get('createdAt') as FormControl;
    }

    get date(): string {
        return this.createdAtField.value;
    }

    get userIdField(): FormControl {
        return this.searchForm.get('userId') as FormControl;
    }

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private api: ApiService,
        private store: SearchInvoiceStoreService) { }
}

interface UserData {
    id: number;
    displayName: string;
}


