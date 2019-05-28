import { Component, OnInit } from '@angular/core';
import { AutenticationService } from '../../services/autentication/autentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( public autenticationService: AutenticationService) { }

  ngOnInit() {
  }

}
