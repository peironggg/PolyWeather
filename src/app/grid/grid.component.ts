import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public weatherSearchForm: FormGroup;
  public textDisplay: String = ":)";
  public isShowForm: boolean = false;
  public isShowText: boolean = true;
  public isDisabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.weatherSearchForm = this.formBuilder.group({
      location: ['']
    })
  }

  toggleDisplay(event) {
    if (!this.isShowForm) {
      this.isShowForm = !this.isShowForm;
      this.isShowText = !this.isShowText;
    }    
  }

  fetchWeather(event, formValues) {
    if (event.keyCode == 13) {
      this.apiService
      .getWeather(formValues.location)
      .subscribe(data => console.log(data));
      
      if (this.isDisabled) {
        this.isDisabled = !this.isDisabled;
      }      
    }
  }

  onEdit() {

  }

}
