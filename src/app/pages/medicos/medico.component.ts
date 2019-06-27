import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospitales } from 'src/app/models/hospitales.model';
import { HospitalesService } from '../../services/hospitales/hospitales.service';
import { MedicosService } from '../../services/medicos/medicos.service';
import { Medicos } from '../../models/medicos.model';
import { HospitalesComponent } from '../hospitales/hospitales.component';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospitales[] = [];
  medico: Medicos = new Medicos('', '', '', '');
  hosp: Hospitales = new Hospitales('');
  constructor(
    public _hospitalesService: HospitalesService,
    public _medicosService: MedicosService,
    public _router: Router,
    public activateRoute: ActivatedRoute,
    public modalUpload: ModalUploadService
  ) {
    activateRoute.params.subscribe( params => {
        let id = params['id'];
        if ( id !== 'nuevo' ) {
              this.cargarMedico( id);
        }
    });
  }

  ngOnInit() {
    this.cargarHospitales();
    this.modalUpload.notificacion
    .subscribe( resp => {
        console.log(resp);
        this.medico.img = resp.medico.img;
    });
  }

  guardarMedico( form: NgForm ) {
    console.log( form.value);
    if ( form.invalid ) {
      return;
    }
    this._medicosService.guardarMedico(this.medico)
    .subscribe( medico => {
        this.medico._id = medico._id;
        this._router.navigate(['/medico', medico._id]);
    }) ;
  }

  cargarHospitales() {
    this._hospitalesService.cargarHospitales( 0 )
    .subscribe( (resp: any) => { this.hospitales = resp.Hospitals; });
  }

  cambioHospital ( idHospital: string ) {
      this._hospitalesService.obtenerHospital( idHospital)
      .subscribe( (hosp: any) => {
            this.hosp = hosp;
      });
  }

  cargarMedico( id: string) {
    this._medicosService.cargarMedico( id)
    .subscribe( (medico: any) => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital);
    });
  }

  cambiarFoto() {
    this.modalUpload.mostrarModal('medicos', this.medico._id );
  }
}
