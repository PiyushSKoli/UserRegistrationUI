import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ProfileComponent } from './component/profile/profile.component';
import { UserComponent } from './component/user/user.component'
import { AuthenticationGuard } from './Guard/authentication.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {component: LoginComponent, path:'login'},
  {component: UserComponent, path:'admin',canActivate: [AuthenticationGuard]},
  {component: ProfileComponent, path:'profile'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
