import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { AutenticationService } from '../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public forma: FormGroup;

  constructor(
    public autentication: AutenticationService,
    public router: Router ) { }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      usuario : new FormControl(null, Validators.required) ,
      password : new FormControl(null, Validators.required)
    });

  }

  ingresar() {
    if ( this.forma.invalid ) {
      return;
    }
    var user = new Usuario(
        this.forma.value.usuario,
        this.forma.value.usuario,
        this.forma.value.password
    );
    this.autentication.autenticarUsuario(user, false)
        .subscribe(rep =>  this.router.navigate([ '/dashboard' ]));
  }
}
