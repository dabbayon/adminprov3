import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription, observable } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {
      this.suscription = this.regregaObsarvable().subscribe(
        numero => console.log('Sus', numero),
        error => console.error('error', error),
        () => console.log('Termino')
      );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
      console.log('la pagina se va cerrar');
      this.suscription.unsubscribe();
  }

  regregaObsarvable(): Observable<any> {
    return  new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;

        const salida = {
          valor: contador
        };
        observer.next( salida);
        // if ( contador === 3){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if ( contador === 2) {
        //   //clearInterval(intervalo);
        //   observer.error('Auxulio!');
        // }

      }, 1000);
    }).pipe(
      map( resp => resp.valor),
      filter( ( valor, index) => {
        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }

      })
    );

  }


}
