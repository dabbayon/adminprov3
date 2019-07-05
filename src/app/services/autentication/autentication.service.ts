import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIO } from '../../config/config';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  public usuario: Usuario;
  public token: string;
  public menu: any = [];
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
      this.usuario =  (localStorage.getItem('usuario') !== 'undefined') ? JSON.parse( localStorage.getItem('usuario')) : '';
      this.menu = (localStorage.getItem('menu') !== 'undefined' ) ? JSON.parse( localStorage.getItem('menu')) : '';
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  loginGoole(token: string) {
    let url = URL_SERVICIO + 'login/google';
    return this.http.post(url, { token })
        .pipe(map((resp: any ) => {
            this.setUser(resp, resp.menu);
            console.log(resp);
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
                .map((resp: any) => {
                     this.setUser(resp, resp.menu);
                     return true;
                })
                .catch( err => {
                    swal('Error de autenticación', err.error.mensaje, 'error');
                    return Observable.throw( err );
                });
  }
  setUser(user: any, menu: any) {
    localStorage.setItem('usuario', JSON.stringify( user.usuario )  );
    localStorage.setItem('id', user.id  );
    localStorage.setItem('token', user.token );
    localStorage.setItem('menu', JSON.stringify( menu ) );
    this.usuario = (user.usuario) ? user.usuario : user;
    this.token = user.token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

}
