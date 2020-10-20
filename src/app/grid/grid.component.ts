import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() id: String;

  public weatherSearchForm: FormGroup;

  public displayInfo = {
    cityDisplay: "",
    weatherDisplay: "",
    tempDisplay: "",
    feelsLikeDisplay: "",
    speedDisplay: "",
    weatherIcon: undefined,
  }

  public booleanInfo = {
    isShowForm: false,
    isShowText: true,
    isShowBtn: false,
    isDisabled: true,
    pointerEvent: "auto",
  }

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {    
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    })
    const savedData = JSON.parse(localStorage.getItem(`${this.id}`));
    
    if (savedData) {
      this.displayInfo = savedData['displayInfo'];
      this.booleanInfo = savedData['booleanInfo'];
    }
  }

  activateForm() {
    this.booleanInfo['isShowForm'] = true;
    this.booleanInfo['isShowText'] = false;
    this.booleanInfo['isShowBtn'] = true;
    this.booleanInfo['pointerEvent'] = "none";
  }

  toggleForm() {          
    this.booleanInfo['isShowForm'] = !this.booleanInfo['isShowForm'];
    this.booleanInfo['isShowText'] = !this.booleanInfo['isShowText'];

    if (this.booleanInfo['isDisabled']) {
      this.booleanInfo['isDisabled'] = !this.booleanInfo['isDisabled'];
    }
  }

  fetchWeather(event, formValues) {
    if (event.keyCode == 13) {      
      this.apiService
      .getWeather(formValues.location)      
      .pipe(mergeMap(res => {               
        this.displayInfo['cityDisplay'] = `Place: ${res['name']}`;
        this.displayInfo['weatherDisplay'] = `Weather: ${res['weather'][0]['description'].split(' ').map(this.capitalize).join(' ')}`;
        this.displayInfo['tempDisplay'] = `Temperature: ${res['main']['temp']} ${String.fromCharCode(8451)}`;
        this.displayInfo['feelsLikeDisplay'] = `Feels Like: ${res['main']['feels_like']} ${String.fromCharCode(8451)}`
        this.displayInfo['speedDisplay'] = `Wind Speed: ${res['wind']['speed']}`;
        this.toggleForm();                

        return this.apiService.getIcon(res['weather'][0]['icon']);
      })
      ).subscribe(
        data => {
          this.displayInfo['weatherIcon'] = URL.createObjectURL(data);
          this.saveToStorage();
        },
        err => {
          this.displayInfo['cityDisplay'] = err['statusText'];
          this.toggleForm();
        }
      );   
    }
  }

  saveToStorage() {    
    const dataToSave = {
      displayInfo: this.displayInfo,
      booleanInfo: this.booleanInfo,
    }

    localStorage.setItem(`${this.id}`, JSON.stringify(dataToSave));
  }

  onEdit() {    
  }

  capitalize(str: String): String {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  divStyle() {    
    return {
      'height': '300px',      
      'pointer-events': this.booleanInfo['pointerEvent'],          
    };
  }

  imgStyle() {
    return {
      'background-image': `url(${this.displayInfo['weatherIcon']})`,
      'position': 'absolute',   
      'top': '5px',   
      'left': '5px',
      'height': '50px',
      'width': '50px',
    }
  }

  buttonStyle() {
    return {
      'pointer-events': 'all',
      'position': 'absolute',   
      'left': '5px',   
      'bottom': '5px',
      'display': 'flex',  
    };
  }

  inputStyle() {
    return {
      'pointer-events': 'all',
    };
  }

  textStyle() {
    return {            
    };
  }

  breakStyle() {
    return {
      'height': '15px',
    }
  }
}
