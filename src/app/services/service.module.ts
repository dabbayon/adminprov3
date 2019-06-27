import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  MedicosService,
  HospitalesService
 } from './service.index';
import {  HttpClientModule } from '@angular/common/http';
import { AutenticationService } from './autentication/autentication.service';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


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
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicosService,
    HospitalesService
  ],
  declarations: []
})
export class ServiceModule { }
