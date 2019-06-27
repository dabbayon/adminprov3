import { Injectable } from '@angular/core';
import { URL_SERVICIO } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospitales } from '../../models/hospitales.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(
      public http: HttpClient
  ) { }

  cargarHospitales( desde: number) {
      let url = URL_SERVICIO + 'hospital?desde=' + desde;
      return this.http.get(url);
  }

  obtenerHospital( id: string) {
    let url = URL_SERVICIO + 'hospital/' + id;
    return this.http.get(url);
  }

  borrarHospital( id: string) {
    let url = URL_SERVICIO + 'hospital/' + id + '?token=' + localStorage.getItem('token');
    return this.http.delete( url)
        .pipe(map( (resp: any) => {
                swal('Se ha eliminado el hospital' , resp.Hospital.nombre , 'success' );
                return true;
        }));
  }

  crearHospital( hospital: Hospitales) {
    let url = URL_SERVICIO + 'hospital?token=' + localStorage.getItem('token');
    return this.http.post( url, hospital)
        .pipe(map( (resp: any) => {
                swal('Hospital creado' , resp.Hospital.nombre , 'success' );
                return true;
        }));
  }

  buscarHospital( nombre: string) {
    let url = URL_SERVICIO + 'busqueda/coleccion/hospital/' + nombre;
    return this.http.get(url );
  }

  actualizarHospital( hospital: Hospitales) {
    // let url = URL_SERVICIO + 'hospitales';
    // return this.http.put(url , hospital );
    let url = URL_SERVICIO + 'hospital/' + hospital._id + '?token=' + localStorage.getItem('token');
    return this.http.put( url, hospital)
        .pipe(map( (resp: any) => {
                swal('Hospital actualizado' , resp.Hospital.nombre , 'success' );
                return true;
        }));
  }
}
