import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  city:string = "";

  constructor(
    private eventEmitterService: EventEmitterService
  ) { }

  ngOnInit(): void {
  }
  handleSubmit(e: any, city:string){
    e.preventDefault();
  }

  handleKeyUp(e: any){
    if(e.keyCode === 13){
       this.eventEmitterService.onEnterCity(e.target.value);
    }
 }

 handleClick(city:string){
   this.eventEmitterService.onEnterCity(city)
 }

}
