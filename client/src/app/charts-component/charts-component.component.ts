import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts-component',
  templateUrl: './app-charts-component.html',
  styleUrls: ['./app-charts-component.css']
})
export class ChartsComponentComponent implements OnInit {

  constructor() {}

  public chart: any;


  ngOnInit(): void {

    this.chart = new Chart("MyChart", {
          type: 'bar', //this denotes tha type of chart

          data: {// values on X-Axis
            labels: ['00:00 - 03:00', '03:00 - 06:00', '06:00 - 09:00','09:00 - 12:00',
    								 '12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00', '21:00 - 24:00'],
    	       datasets: [
              {
                label: "Waste",
                data: ['90','120', '212', '79', '92',
    								 '174', '75', '56'],
                backgroundColor: 'blue',
                borderWidth:1,
                hoverBorderWidth:3,
                hoverBorderColor:'red'
              },
              {
                label: "Product",
                data: ['890', '789', '675', '666', '347',
    									 '0.00', '245', '645'],
                backgroundColor: 'limegreen',
                borderWidth:1,
                hoverBorderWidth:3,
                hoverBorderColor:'black'
              }
            ]
          },
          options: {
            aspectRatio:2,
            // title: {
            //   display:true,
            //   text: 'Weekly Productivity',
            //   fontSize: 20
            // }
          }

        });

  }
}
