import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getWeather(location){
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q={${location}}&appid={d2c91c5d9ba1fef8837fdb7d9e59c1e1}`
    );
}
}
