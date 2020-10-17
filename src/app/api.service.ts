import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getWeather(location) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d2c91c5d9ba1fef8837fdb7d9e59c1e1`
    );
  }

  getIcon(icon) {
    return this.http.get(
      `http://openweathermap.org/img/wn/${icon}.png`, {
        responseType: 'blob'
      }
    );
  }
}
