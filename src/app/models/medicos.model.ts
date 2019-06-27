import { Usuario } from './usuario.model';
import { Hospitales } from './hospitales.model';


export class Medicos {
  constructor(
    public nombre: string,
    public img: string,
    //public usuario: Usuario,
    public usuario: string,
    public hospital: string,
    public email?: string,
    public domicilio?: string,
    public  _id?: string
  ) { }

}
