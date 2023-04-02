import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { UserComponent } from './user.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TemplatePageTitleStrategy } from '../../shared/services/title-strategy/title-strategy';

const routes: Routes = [{
  path: '', component: UserComponent, children: [
    { path: 'sign-in', title: 'Sign In', component: SignInComponent },
    { path: 'register', title: 'Register', component: RegisterComponent },
    { path: 'profile', title: 'Profile', component: ProfileComponent },
    { path: '**', redirectTo: 'sign-in', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{
    provide: TitleStrategy,
    useClass: TemplatePageTitleStrategy
  }]
})
export class UserRoutingModule { }
