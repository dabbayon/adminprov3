import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticationService } from '../../services/autentication/autentication.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: File;
  constructor( public _autenticationservice: AutenticationService,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    this.usuario = this._autenticationservice.usuario;
  }

  guardar( usuario: Usuario ) {
      this.usuario.nombre = usuario.nombre;
      this.usuario.email = ( !this.usuario.google) ? usuario.email : this.usuario.email ;
      this._usuarioService.actualizarUsuario(this.usuario)
          .subscribe();
  }

  seleccionImagen( archivo: File ) {
      if ( !archivo ) {
        this.imagenSubir = null;
        return false;
      }
      if ( archivo.type.indexOf('image') === -1 ) {
        this.imagenSubir = null;
        swal('El archivo seleccionado no es una imagen', 'error' );
        return;
      }
      this.imagenSubir = archivo;
      let reader = new FileReader();
      let urltemp= reader.readAsDataURL( archivo );
      
      reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen( ) {
      this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }


}

