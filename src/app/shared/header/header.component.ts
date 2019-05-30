import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../services/autentication/autentication.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor( public autenticationService: AutenticationService) { }

  ngOnInit() {
      this.usuario = this.autenticationService.usuario;
  }

}
