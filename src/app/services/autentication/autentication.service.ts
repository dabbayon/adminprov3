import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIO } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  public usuario: Usuario;
  public token: string;
  constructor(
    public http: HttpClient,
    public router: Router
  ) {
     this.cargarStorage();
  }
  estaLogueado() {
      return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  loginGoole(token: string) {
    let url = URL_SERVICIO + 'login/google';
    return this.http.post(url, { token })
        .pipe(map((resp: any ) => {
            this.setUser(resp);
            return true;
        }));
  }

  autenticarUsuario(user: Usuario, recuerdame: boolean) {

    if ( recuerdame ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIO + 'login';
    let body = {};
    body = {email: user.email, password : user.password};
    return this.http.post( url, body )
                .pipe(map((resp: any) => {
                     this.setUser(resp);
                     return true;
                }));
  }
  setUser(user: any) {
    localStorage.setItem('usuario', JSON.stringify( user )  );
    localStorage.setItem('id', user.id  );
    localStorage.setItem('token', user.token );
    this.usuario = user;
    this.token = user.token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

}
