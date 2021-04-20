import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PosItem } from '../../../../../../shared/collection';
import { PosItemService } from '../../../../../../shared/services/posItem/pos-item.service';

@Component({
  selector: 'app-pos-item-list',
  templateUrl: './pos-item-list.component.html',
  styleUrls: ['./pos-item-list.component.css']
})
export class PosItemListComponent implements OnInit {

  constructor(
    private posItemService: PosItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.posItemService.init();
  }

  get posItems(): Observable<PosItem[]> {
    return this.posItemService.getAsObservable() as Observable<PosItem[]>;
  }

  onSelect(posItem: PosItem): void {
    this.router.navigate(['/admin', 'pos-item', posItem.id, 'template']);
  }
}
