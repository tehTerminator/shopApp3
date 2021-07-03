import { Component } from '@angular/core';
import { MenuItems } from './side-menu.json';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styles: ['']
})
export class SideMenuComponent {
    menuItems: Menu[] = MenuItems;

    getQueryParams(index: number): {[key: string]: string} {
        const menu = this.menuItems[index];
        if (menu.queryParams) {
            return { header: menu.title, ...menu.queryParams };
        }
        return { header: menu.title };
    }
}

interface Menu {
    title: string;
    chartType: string;
    url: string;
    queryParams?: {
        [key: string]: any
    };
}
