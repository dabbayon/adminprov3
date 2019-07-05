import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../services/autentication/autentication.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public autenticationService: AutenticationService,
    public router: Router) { }

  ngOnInit() {
      this.usuario = this.autenticationService.usuario;
  }
  buscar(termino: string ) {
    this.router.navigate(['/busqueda', termino]);
  }
}
