import { DomHandler } from './components/directives/domhandler';
import { Component, Renderer, ElementRef, ViewChild, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data: { 'brand': string; 'year': number; 'color': string; 'vin': string; }[];
  columns = [];
  constructor() {
  }

  ngOnInit() {
    this.columns = [
      { field: 'vin', header: 'Vin', width: '25%' },
      { field: 'year', header: 'Year', width: '15%' },
      { field: 'brand', header: 'Brand', width: '35%' },
      { field: 'color', header: 'Color', width: '25%' }
    ];
    this.data = [
      { 'brand': 'VW', 'year': 2012, 'color': 'Orange', 'vin': 'dsad231ff' },
      { 'brand': 'Audi', 'year': 2011, 'color': 'Black', 'vin': 'gwregre345' },
      { 'brand': 'Renault', 'year': 2005, 'color': 'Gray', 'vin': 'h354htr' },
      { 'brand': 'BMW', 'year': 2003, 'color': 'Blue', 'vin': 'j6w54qgh' },
      { 'brand': 'Mercedes', 'year': 1995, 'color': 'Orange', 'vin': 'hrtwy34' },
      { 'brand': 'Volvo', 'year': 2005, 'color': 'Black', 'vin': 'jejtyj' },
      { 'brand': 'Honda', 'year': 2012, 'color': 'Yellow', 'vin': 'g43gr' },
      { 'brand': 'Jaguar', 'year': 2013, 'color': 'Orange', 'vin': 'greg34' },
      { 'brand': 'Ford', 'year': 2000, 'color': 'Black', 'vin': 'h54hw5' },
      { 'brand': 'Fiat', 'year': 2013, 'color': 'Red', 'vin': '245t2s' },
      // repeat
     /*  { 'brand': 'VW', 'year': 2012, 'color': 'Orange', 'vin': 'dsad231ff' },
      { 'brand': 'Audi', 'year': 2011, 'color': 'Black', 'vin': 'gwregre345' },
      { 'brand': 'Renault', 'year': 2005, 'color': 'Gray', 'vin': 'h354htr' },
      { 'brand': 'BMW', 'year': 2003, 'color': 'Blue', 'vin': 'j6w54qgh' },
      { 'brand': 'Mercedes', 'year': 1995, 'color': 'Orange', 'vin': 'hrtwy34' },
      { 'brand': 'Volvo', 'year': 2005, 'color': 'Black', 'vin': 'jejtyj' },
      { 'brand': 'Honda', 'year': 2012, 'color': 'Yellow', 'vin': 'g43gr' },
      { 'brand': 'Jaguar', 'year': 2013, 'color': 'Orange', 'vin': 'greg34' },
      { 'brand': 'Ford', 'year': 2000, 'color': 'Black', 'vin': 'h54hw5' },
      { 'brand': 'Fiat', 'year': 2013, 'color': 'Red', 'vin': '245t2s' } */
    ]
  }
}
