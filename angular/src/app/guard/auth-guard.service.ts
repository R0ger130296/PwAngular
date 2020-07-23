import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PermisosService } from '../services/permisos.service';

@Injectable()
export class AuthGuardService implements  CanActivate{

  constructor(public auth: PermisosService, public router: Router) {}
  canActivate() {
    if (this.auth.getUserRol()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
