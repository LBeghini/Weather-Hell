import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private WEATHER_API = "http://api.weatherstack.com/current?access_key=9da55f4646668887f8147a6e7e028aa2&query=New%20York";
  
  private cities: string[] = []
  
  constructor( private http : HttpClient ) { }

  GetWeatherFromAPI( city: string) {
    let data = this.http.get<any>(`http://api.weatherstack.com/current?access_key=9da55f4646668887f8147a6e7e028aa2&query=${encodeURI(city)}`);
    return data;
  }

  SetCity(city: string) {
    if (!this.cities.includes(city)){
      this.cities.push(city);
      localStorage.setItem("cities", JSON.stringify(this.cities))
    }
    
  }

  GetCities() {
    let storedCities = localStorage.getItem("cities");
    if (storedCities){
      return JSON.parse(storedCities)
    }
  }
}
