import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { EventEmitterService } from '../event-emitter.service';

export class Weather {
  constructor(
    public current: {
        observation_time: string,
        temperature: number,
        weather_descriptions: Array<string>
    },
    public location: {
      name: string,
      localtime: string
    }
  ) {
    
  }
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather: Weather | null = null;
  description: string = ""; 
  icon: string = "";
  day: boolean = true;
  time:number = 0;
  error = false;


  constructor( private data: DataService, 
              private eventEmitterService : EventEmitterService ) { }

  ngOnInit(): void {
    if(this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.enterCity.subscribe((city: string) => {
        this.getWeather(city);
      })
    }
  }

  getWeather(city: string) {
    this.data.GetWeatherFromAPI(city).subscribe(
      data => {
        if (data.error) {
          this.error = true;
        }else{
          this.error = false;
          this.weather = data;
          if (this.weather !== null) {
            this.description = this.weather.current.weather_descriptions[0].toLowerCase();
            this.time = parseInt(this.weather.location.localtime.slice(-5, -3));
            if( this.time > 18 || this.time < 6){
              this.day = false;
            }else{
              this.day = true;
            }
  
            if (this.description.includes("sunny") || this.description.includes("clear")) {
              if (this.day){
                this.icon = "../../assets/icons/svg/001-sun.svg"
              }else{
                this.icon = "../../assets/icons/svg/006-crescent moon.svg"
              }
            }else if (this.description.includes("thunder")){
              this.icon = "../../assets/icons/svg/010-thunderstorm.svg"
            }else if (this.description.includes("drizzle") || this.description.includes("rain")) {
              this.icon = "../../assets/icons/svg/004-rain.svg"
            }else if (this.description.includes("snow")){
              this.icon = "../../assets/icons/svg/009-snowy.svg"
            }else if (this.description.includes("tornado")){
              this.icon = "../../assets/icons/svg/036-hurricane.svg"
            }else{
              this.icon = "../../assets/icons/svg/002-cloud.svg"
            }
          }
        }
      }
    )
  }
}
