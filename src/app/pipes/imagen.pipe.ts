import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string= 'usuario'): any {
    let url = URL_SERVICIO + 'img/';
    if ( !img ) {
     return url + 'usuario/xxxx';
    }
    if ( img.indexOf('https') >= 0 ) {
        return img;
    } else {
        switch ( tipo ) {
          case 'usuario':
                url += 'usuarios/' + img;
          break;
          case 'medicos':
                url += 'medicos/' + img;
          break;
          case 'hospitales':
                url += 'hospitales/' + img;
          break;
          default:
                console.log('tipo de usuario inexistente');
                url += 'usuario/xxxx';
          break;
        }

        return url;
    }
  }

}
