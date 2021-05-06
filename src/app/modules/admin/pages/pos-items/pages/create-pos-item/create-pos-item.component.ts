import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'app-create-pos-item',
    templateUrl: './create-pos-item.component.html',
    styles: ['']
})
export class CreatePosItemComponent {
    constructor(private titleService: Title) {
        this.titleService.setTitle('Create / Update Bundle | ShopApp');
    }
}