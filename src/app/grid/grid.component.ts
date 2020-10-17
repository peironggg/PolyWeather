import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { catchError, mergeMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public weatherIcon: any;
  public textDisplay: String = "";
  public isShowForm: boolean = false;
  public isShowText: boolean = true;
  public isShowBtn: boolean = false;
  public isDisabled: boolean = true;
  public pointerEvent: String = "auto";  

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    })
  }

  activateForm() {
    this.isShowForm = true;
    this.isShowText = false;
    this.isShowBtn = true;
    this.pointerEvent = "none";
  }

  toggleForm() {          
    this.isShowForm = !this.isShowForm;
    this.isShowText = !this.isShowText;

    if (this.isDisabled) {
      this.isDisabled = !this.isDisabled;
    }
  }

  fetchWeather(event, formValues) {
    if (event.keyCode == 13) {      
      this.apiService
      .getWeather(formValues.location)      
      .pipe(mergeMap(res => {               
        this.textDisplay = res['weather'][0]['description'];        
        this.toggleForm();

        return this.apiService.getIcon(res['weather'][0]['icon']);
      })
      ).subscribe(
        data => this.weatherIcon = URL.createObjectURL(data),
        err => {
          this.textDisplay = err['statusText'];
          this.toggleForm();
        }
        );   
    }
  }

  onEdit() {    
  }

  divStyle() {    
    return {
      'height': '100px',
      'pointer-events': this.pointerEvent,
      'background-image': `url(${this.weatherIcon})`,      
    };
  }

  buttonStyle() {
    return {
      'pointer-events': 'all',
      'position': 'absolute',      
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

}
