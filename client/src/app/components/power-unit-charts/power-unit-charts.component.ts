import { Component, OnInit } from '@angular/core';
import {Chart} from "angular-highcharts";

@Component({
  selector: 'app-power-unit-charts-component',
  templateUrl: './app-power-unit-charts.html',
  styles: [
  ]
})
export class PowerUnitChartsComponent implements OnInit {
  labels = ['00:00 - 03:00', '03:00 - 06:00', '06:00 - 09:00', '09:00 - 12:00',
    '12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00', '21:00 - 24:00'];

  hours = [90, 120, 212, 79, 92, 174, 75, 56]; // This corresponds to the "Hours" dataset
  tons = [890, 789, 675, 666, 347, 0.00, 245, 645]; // This corresponds to the "Tons" dataset
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.initializeChart(this.hours, this.tons);
    this.updateChartData();
    setInterval(() => this.updateChartData(), 1800000); // Update every half hour
  }

  initializeChart(hoursData: number[], tonsData: number[]): void {
    this.chart = new Chart({
      chart: {
        type: 'line',
        height: 450
      },
      title: {
        text: 'Tons produced over time'
      },
      xAxis: {
        categories: ['00:00 - 03:00', '03:00 - 06:00', '06:00 - 09:00', '09:00 - 12:00',
          '12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00', '21:00 - 24:00'],
        title: {
          text: 'hours'
        }
      },
      yAxis: {
        title: {
          text: 'tons'
        }
      },
      series: [
        {
          name: "Hours",
          type: 'line',
          color: '#044342',
          data: hoursData
        },
        {
          name: 'Tons',
          type: 'line',
          color: '#ed9e20',
          data: tonsData
        }
      ],
      credits: {
        enabled: false
      }
    });
  }

  updateChartData(): void {
    let hoursData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 300));
    let tonsData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000));
    this.initializeChart(hoursData, tonsData)
  }
}
