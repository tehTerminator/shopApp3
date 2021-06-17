import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { CoreModule } from './modules/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { CalculatorComponent } from './shared/components/calculator/calculator.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EvaluatorComponent } from './shared/components/calculator/evaluator/evaluator.component';
import { CurrencyTableComponent } from './shared/components/calculator/currency-table/currency-table.component';
import { CurrencyFormComponent } from './shared/components/calculator/currency-form/currency-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotificationComponent,
    CalculatorComponent,
    EvaluatorComponent,
    CurrencyTableComponent,
    CurrencyFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
