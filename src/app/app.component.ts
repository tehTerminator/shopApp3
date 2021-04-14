import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CalculatorComponent } from './base/calculator/calculator.component';
import { NotificationComponent } from './base/notification/notification.component';
import { AppDialog } from './shared/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopApp3';

  constructor(private auth: AuthService, private dialog: MatDialog) {
    this.auth.init();
  }

  show(dialogType: AppDialog): void {
    this.dialog.closeAll();
    switch (dialogType) {
      case AppDialog.CALCULATOR:
        this.dialog.open(CalculatorComponent);
        break;
      case AppDialog.NOTIFICATION:
        this.dialog.open(NotificationComponent, {minWidth: '600px', maxHeight: '500px'});
        break;
      default:
        alert('Invalid Dialog Argument');
        break;
    }
  }
}
