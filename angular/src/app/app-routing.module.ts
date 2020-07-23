import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
//import { AuthGuardService } from './guard/auth-guard.service';

const routes: Routes = [
  {path:'',redirectTo: '/login', pathMatch: 'full'},
  {path: 'login',component: LoginComponent},
  //{path: 'menu',  loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule), canActivate: [AuthGuardService]},
  {path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)},
  {path: 'no-found',component: ErrorComponent},
  {path: '**',redirectTo: 'no-found'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
