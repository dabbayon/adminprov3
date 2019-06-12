import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: File;
  constructor(
    public _cargaArchivoService:  SubirArchivoService,
    public _modalUpload: ModalUploadService
  ) { }

  ngOnInit() {
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return false;
    }
    if ( archivo.type.indexOf('image') === -1 ) {
      this.imagenSubir = null;
      swal( 'El archivo seleccionado no es una imagen', 'error' );
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urltemp= reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

}
subirImagen() {
    this._cargaArchivoService.subirArchivo( this.imagenSubir, this._modalUpload.tipo, this._modalUpload.id )
        .then( resp => {
            this._modalUpload.notificacion.emit( resp);
            this.cerrarModal();
        })
        .catch( err => {
           console.log('error en la carga');
        });
}

cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUpload.ocultarModal();
}

}
