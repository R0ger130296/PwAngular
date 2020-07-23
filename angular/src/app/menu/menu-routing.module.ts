import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegisterUsersComponent } from './register-users/register-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AuthGuardService } from '../guard/auth-guard.service';
import { TokenService } from '../guard/token.service';
const routes: Routes = [
  {path: '', component: MenuComponent },
  {path: 'usuarios', component:UsuariosComponent,canActivate: [AuthGuardService,TokenService]},
  {path: 'register-users', component:RegisterUsersComponent},
  {path: 'edit-users', component:EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
