import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private WEATHER_API = "http://api.weatherstack.com/current?access_key=9da55f4646668887f8147a6e7e028aa2&query=New%20York";

  constructor( private http : HttpClient ) { }

  GetWeatherFromAPI( city: string) {
    let data = this.http.get<any>(`http://api.weatherstack.com/current?access_key=9da55f4646668887f8147a6e7e028aa2&query=${encodeURI(city)}`);
    return data;
  }
}
