import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from './../core/core.module';
import { BannerComponent } from './banner/banner.component';


@NgModule({
  declarations: [
    UserComponent,
    SignInComponent,
    RegisterComponent,
    ProfileComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    CoreModule,
  ]
})
export class UserModule { }
