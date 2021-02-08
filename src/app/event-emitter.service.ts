import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  enterCity = new EventEmitter();
  subsVar! : Subscription;

  constructor() { }

  onEnterCity(city:string) {
    this.enterCity.emit(city);
  }
}
