import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AutenticationService } from '../autentication/autentication.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor( public _autenticationService: AutenticationService,
    public _router: Router) { }
  canActivate() {
    if ( this._autenticationService.estaLogueado()) {
      console.log('pasa por guard');
      return true;
    } else {
      console.log('bloqueado por el guard');
      this._router.navigate(['/login']);
    }
  }
}
