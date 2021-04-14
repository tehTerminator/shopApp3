import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    UserComponent,
    SignInComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
