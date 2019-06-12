import { Injectable, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';
//import { map } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import swal from 'sweetalert';
import { pipe } from '@angular/core/src/render3/pipe';
import { AutenticationService } from '../autentication/autentication.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuairio: Usuario;
  constructor(
    public http: HttpClient,
    public _autenticationservie: AutenticationService,
    public _subirArchivoService: SubirArchivoService
  ) {
     console.log('servicio de usuario listo') ;
     //this.usuairio = this._autenticationservie.usuario;
  }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIO + 'usuario';
    return this.http.post( url , usuario )
            .pipe(map((resp: any) => {
                  swal('Usuario Creado', resp.usuario.email, 'success' );
                  return resp.usuario;
            }));
  }

  actualizarUsuario(usuario: Usuario) {
      let url = URL_SERVICIO + 'usuario/' + usuario._id + '?token=' + localStorage.getItem('token');
      return this.http.put( url, usuario)
          .pipe(map( (resp: any) => {
                  if ( usuario._id === this._autenticationservie.usuario._id ) {
                    this._autenticationservie.setUser( resp.usuario);
                  }
                  swal('Usuario actualizado ' , resp.usuario.nombre, 'success');
                  return true;
          }));
  }

  cambiarImagen( file: File, id: string ) {

      this._subirArchivoService.subirArchivo( file, 'usuarios', id )
        .then( (resp: any) => {
            console.log( resp);
            this.usuairio = this._autenticationservie.usuario;
            this.usuairio.img = resp.usuario.img;
            swal('Imagen actualizada', this.usuairio.nombre, 'success');
            this._autenticationservie.setUser(this.usuairio);
        })
        .catch( error => {
            console.log( error);
        });
  }

  cargarUsuarios( desde: number= 0) {
      let url = URL_SERVICIO + 'usuario?desde=' + desde;
      return this.http.get( url );
   }

  buscarUsuario( termino: string ) {
    let url = URL_SERVICIO + 'busqueda/coleccion/usuario/' + termino;
    return this.http.get(url);
  }

  borrarUsuario( id: string ) {
    let url = URL_SERVICIO + 'usuario/' + id + '?token=' + this._autenticationservie.token;
    return this.http.delete( url )
          .pipe(map( resp => {
              swal("Se eliminó correctamente!" , {
                icon: "success",
              });
              return true;
          } ));
  }
}
