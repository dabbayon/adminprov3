import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';
//import { map } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
     console.log('servicio de usuario listo') ;
  }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIO + 'usuario';
    return this.http.post( url , usuario )
            .pipe(map((resp: any) => {
                  swal('Usuario Creado', resp.usuario.email, 'success' );
                  return resp.usuario;
            }));
  }
}
