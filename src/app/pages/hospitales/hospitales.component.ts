import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../services/service.index';
import { Hospitales } from '../../models/hospitales.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospitales[] = [];
  desde: number = 0;
  totalregistros: number = 0;
  cargando: boolean =  true;

  constructor(
    public _hospitalesService: HospitalesService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe( resp =>  this.cargarHospitales() );
  }
  cargarHospitales() {
    this._hospitalesService.cargarHospitales( this.desde )
    .subscribe( (resp: any ) => {
      this.totalregistros = resp.total;
      this.hospitales = resp.Hospitals;
      this.cargando = false;
  });
  }

  borrarHospital( hospital: Hospitales ) {
    swal( {
      title: "Esta seguro?",
      text: "esta a punto de borrar a "+ hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    } )
    .then( borrar => {
      if  ( borrar ) {
         this._hospitalesService.borrarHospital(hospital._id).subscribe(
           (resp: any ) => {
              this.desde = 0;
              this.cargarHospitales();
           });
      } else {
        //swal("Hubo errores al eliminar!");
      }
    });

  }

  guardarHospital( hospital: Hospitales ) {
      this._hospitalesService.actualizarHospital(hospital )
            .subscribe();

  }

  buscarHospital( nombre: string) {
    if ( nombre !== '' ) {
    this._hospitalesService.buscarHospital( nombre)
      .subscribe(
          (resp: any) => {
                this.hospitales = resp.tabla;
                this.totalregistros = resp.tabla.length;
          });
       } else {
         this.cargarHospitales();
       }
  }


  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id);
  }

  crearHospital() {
    swal({
      title: 'Nuevo hospital',
      text: 'Ingrese Nombre del hospital. e.j. "Del Norte" ',
      content: "input" ,
      button: {
        text: "Guardar" ,
        closeModal: true,
      },
    })
    .then(name => {
        if ( name !== '' ) {
          const hosp = new Hospitales(name);
          this._hospitalesService.crearHospital(hosp).subscribe(
            (resp: any) => {
                  this.cargarHospitales();
             }
          );
        }
    })
    .catch(err => {
      if (err) {
        swal('Error al crear hospital!', 'error' );
      } else {
        swal.stopLoading();
        swal.close();
      }
    });

  }
}
