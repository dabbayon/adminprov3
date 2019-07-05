import { Injectable } from '@angular/core';
import { AutenticationService } from '../autentication/autentication.service';

@Injectable()
export class SidebarService {
  menu: any[] = [];
  constructor(
    public autenticationService: AutenticationService
  ) { }
  cargarMenu() {
    this.menu = this.autenticationService.menu;
  }

}
