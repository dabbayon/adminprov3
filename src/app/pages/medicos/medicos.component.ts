import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../services/medicos/medicos.service';
import { Medicos } from 'src/app/models/medicos.model';
import { Subscriber } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  Medicos: Medicos [] =  [];
  constructor(public _medicosService: MedicosService) { }

  ngOnInit() {
    this.cargarMedicos( '0' );
  }

  cargarMedicos( desde: string ) {
      this._medicosService.cargarMedicos( desde ).subscribe(
        (resp: any) => {
            this.Medicos = resp.medicos;
        });

  }

  buscarMedicos( termino: string ) {
    if ( termino !== '' ) {
        this._medicosService.buscarMedicos( termino ).subscribe(
            (resp: any) => {
                this.Medicos = resp.tabla;
            });
    } else {
      this.cargarMedicos( '0' );
    }
  }

  borrarMedico( id: string) {
      this._medicosService.borrarMedico( id )
      .subscribe( () => {this.cargarMedicos( '0' ); });
  }

}
