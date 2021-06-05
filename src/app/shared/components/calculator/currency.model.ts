export class Currency {
    constructor(private theDenomination: number, public count: number) { }

    get amount(): number {
        return this.denomination * this.count;
    }

    get denomination(): number {
        return this.theDenomination;
    }
}
