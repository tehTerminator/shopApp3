import { Injectable } from '@angular/core';

@Injectable()
export class PosFormStateService {

    state = PosFormState.CREATING_POS_ITEM;

    constructor() { }

    next(): void {
        switch (this.state) {
            case PosFormState.CREATING_POS_ITEM:
                this.state = PosFormState.CREATING_TEMPLATE;
                break;
            case PosFormState.CREATING_TEMPLATE:
                this.state = PosFormState.CREATING_TEMPLATE;
                break;
            case PosFormState.UPDATING_POS_ITEM:
                this.state = PosFormState.SELECTING_TEMPLATE;
                break;
            case PosFormState.SELECTING_TEMPLATE:
                this.state = PosFormState.UPDATING_TEMPLATE;
                break;
            case PosFormState.UPDATING_TEMPLATE:
                this.state = PosFormState.SELECTING_TEMPLATE;
                break;
            default:
                this.state = PosFormState.CREATING_POS_ITEM;
                break;
        }
    }
}

export enum PosFormState {
    CREATING_POS_ITEM,
    CREATING_TEMPLATE,
    UPDATING_POS_ITEM,
    SELECTING_TEMPLATE,
    UPDATING_TEMPLATE
}
