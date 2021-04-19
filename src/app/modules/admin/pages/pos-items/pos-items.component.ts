import { Component, OnInit } from '@angular/core';
import { PosItemService } from '../../../../shared/services/posItem/pos-item.service';
import { PosFormState, PosFormStateService } from './services/pos-form-state.service';

@Component({
  selector: 'app-pos-items',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./pos-items.component.css']
})
export class PosItemsComponent implements OnInit {

  public readonly CREATING_POS_ITEM = PosFormState.CREATING_POS_ITEM;
  public readonly CREATING_TEMPLATE = PosFormState.CREATING_TEMPLATE;
  public readonly UPDATING_POS_ITEM = PosFormState.UPDATING_POS_ITEM;
  public readonly SELECTING_TEMPLATE = PosFormState.SELECTING_TEMPLATE;
  public readonly UPDATING_TEMPLATE = PosFormState.UPDATING_TEMPLATE;

  constructor(
    private posItemService: PosItemService,
    private formStateService: PosFormStateService
  ) { }

  ngOnInit(): void {
  }

}
