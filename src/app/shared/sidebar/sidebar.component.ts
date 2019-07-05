import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { AutenticationService } from '../../services/autentication/autentication.service';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;
  constructor(
      public _sidebar: SidebarService,
      public _autenticationService: AutenticationService
     ) {
      this.usuario = this._autenticationService.usuario;
      }

  ngOnInit() {
    this.usuario = this._autenticationService.usuario;
    this._sidebar.cargarMenu();
  }

}
