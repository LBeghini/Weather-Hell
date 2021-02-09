import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  city:string = "";
  cities: string[] = [];

  constructor(
    private eventEmitterService: EventEmitterService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  callEmmiter(city: string){
    this.eventEmitterService.onEnterCity(city);
    this.dataService.SetCity(city);
    this.cities = this.dataService.GetCities();
  }

  handleKeyUp(e: any){
    if(e.keyCode === 13){
       this.callEmmiter(e.target.value);
    }
 }

 handleClick(city:string){
  this.callEmmiter(city)
 }

}
