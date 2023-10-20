import { Component } from "@angular/core";
import { ApiService } from "../../../../../shared/services/api/api.service";

@Component({
    selector: 'app-recent-voucher-table',
    templateUrl: './recent-voucher-table.component.html',
})
export class RecentVoucherTableComponent {
    public constructor(private api: ApiService) {}
}