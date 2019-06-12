import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { URL_SERVICIO } from '../../config/config';
import { AutenticationService } from '../../services/autentication/autentication.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalregistros: number = 0;
  cargando: boolean =  true;
  constructor(
    public _usuarioService: UsuarioService,
    public _authService: AutenticationService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
        .subscribe( resp =>  this.cargarUsuarios() );
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
    .subscribe( (resp: any ) => {
        this.totalregistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
    });
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    if (desde >= this.totalregistros ) {
      return;
    }
    if ( desde < 0 ) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 )  {
        this.cargarUsuarios();
        return;
    }
    this.cargando = true;
    console.log( termino );
    this._usuarioService.buscarUsuario(termino)
    .subscribe( (resp: any) => {
        this.usuarios = resp.tabla;
        this.totalregistros = resp.tabla.length;
        console.log( resp);
        this.cargando = false;
    });
  }

  borrarUsuario( user: Usuario ) {
    if ( user._id === this._authService.usuario._id ) {
      swal('No puede borrar usuario ', 'No se puede borrar a si mismo' ,'error' );
      return;
    }
    console.log (user );
    swal({
      title: "Esta seguro?",
      text: "esta a punto de borrar a "+ user.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      if  ( borrar ) {
         this._usuarioService.borrarUsuario(user._id).subscribe(
           (resp: any ) => {
              this.desde = 0;
              this.cargarUsuarios();
           });
      } else {
        //swal("Hubo errores al eliminar!");
      }
    });

  }

  guardarUsuario( user: Usuario ) {
      this._usuarioService.actualizarUsuario(user )
            .subscribe();

  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', id);
  }
}
