import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/service.index';
import { AutenticationService } from '../../services/autentication/autentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
      public _sidebar: SidebarService,
      public _autenticationService: AutenticationService
     ) { }

  ngOnInit() {
  }

}
