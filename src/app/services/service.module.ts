import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard
 } from './service.index';
import {  HttpClientModule } from '@angular/common/http';
import { AutenticationService } from './autentication/autentication.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    AutenticationService,
    LoginGuardGuard
  ],
  declarations: []
})
export class ServiceModule { }
