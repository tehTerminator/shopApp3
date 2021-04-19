import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosItem } from '../../../../../../shared/collection';
import { NotificationService } from '../../../../../../shared/services/notification/notification.service';
import { PosItemService } from '../../../../../../shared/services/posItem/pos-item.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  posItemBeingEdited: PosItem;
  constructor(
    private posItemService: PosItemService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try{
      this.posItemBeingEdited = this.posItemService.getElementById(id) as PosItem;
    } catch (e) {
      this.router.navigate(['/admin', 'pos-item']);
      this.notificationService.showError('Invalid Pos ID', e);
    }
  }
}
