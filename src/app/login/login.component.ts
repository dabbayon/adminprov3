import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { AutenticationService } from '../services/service.index';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;
  auth2: any;
  constructor(
    public autentication: AutenticationService,
    public router: Router ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
         client_id: '729951229270-cr69r2p8nnfpk2ioh7gl83o0jdp6geki.apps.googleusercontent.com',
         cookiepolicy: 'single_host_origin',
         scope: 'profile email'
      });
      this.attachSingin( document.getElementById('btnGoogle'));
    });
  }
  attachSingin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
        //let profile = googleUser.getBasicProfile();
        //console.log(profile );
        let token = googleUser.getAuthResponse().id_token;
        this.autentication.loginGoole(token)
          .subscribe( rep => {
            window.location.href = '#/dashboard';
            // this.router.navigate([ '/dashboard' ]);
            // console.log(rep);
          });
    });
  }

  ingresar(forma: NgForm) {
    console.log(forma.value);
    if ( forma.invalid ) {
      return;
    }
    var user = new Usuario(
       forma.value.usuario,
       forma.value.usuario,
       forma.value.password
     );
    this.autentication.autenticarUsuario(user, this.recuerdame)
         .subscribe(rep =>  this.router.navigate([ '/dashboard' ]));
  }
}
