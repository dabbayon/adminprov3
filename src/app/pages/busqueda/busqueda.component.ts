import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospitales } from 'src/app/models/hospitales.model';
import { Medicos } from '../../models/medicos.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  termino: string = '';
  usuarios: Usuario[] = [];
  hospitales: Hospitales[] = [];
  medicos: Medicos[] = [];
  constructor(
    public activateRoute: ActivatedRoute,
    public http: HttpClient

  ) {
    activateRoute.params
    .subscribe( params => {
        this.termino = params['termino'];
        this.buscar();
    });

  }

  ngOnInit() {
  }

  buscar() {
    if ( this.termino === '') {
      return;
    }
    const url = URL_SERVICIO + 'busqueda/todo/' + this.termino;
    this.http.get(url)
      .subscribe( (resp: any ) => {
          console.log( resp );
          this.usuarios = resp.usuarios;
          this.medicos = resp.medicos;
          this.hospitales = resp.Hospitals;
      });
  }

}
