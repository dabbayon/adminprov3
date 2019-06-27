import { Injectable } from '@angular/core';
import { URL_SERVICIO } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Medicos } from '../../models/medicos.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(public http: HttpClient) { }

  cargarMedicos(desde: string) {
    let url =  URL_SERVICIO + 'medico?desde=' + desde;
    return this.http.get(url);
  }

  cargarMedico(id: string) {
    let url =  URL_SERVICIO + 'medico/' + id;
    return this.http.get(url);
  }

  buscarMedicos( termino: string ) {
    let url = URL_SERVICIO + 'busqueda/coleccion/medico/' + termino;
    return this.http.get(url);
  }

  borrarMedico ( id: string ) {
    let url= URL_SERVICIO + 'medico/' + id + '?token=' + localStorage.getItem('token');
    return this.http.delete(url) .pipe(map( resp => {
      swal('Se eliminó correctamente!' , {
        icon: 'success',
      });
      return true;
  } ));
  }

  guardarMedico( medico: Medicos) {
    let url = URL_SERVICIO + 'medico' + '?token=' + localStorage.getItem('token');
    if ( medico._id ) {
      url = URL_SERVICIO + 'medico/' + medico._id + '?token=' + localStorage.getItem('token');
      return this.http.put(url, medico).pipe(
        map( (resp: any) => {
          swal('medico actualizado', medico.nombre, 'success');
          return resp.medico;
        }));
    }
    return  this.http.post(url, medico).pipe(
      map( (resp: any) => {
        swal('medico creado', medico.nombre, 'success');
        return resp.medico;
      })
    );
  }
}
