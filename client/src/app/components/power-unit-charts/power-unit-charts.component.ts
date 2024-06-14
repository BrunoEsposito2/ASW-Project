import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-power-unit-charts-component',
  templateUrl: './app-power-unit-charts.html',
  styles: []
})
export class PowerUnitChartsComponent implements OnInit {
  labels = ['00:00 - 03:00', '03:00 - 06:00', '06:00 - 09:00', '09:00 - 12:00',
    '12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00', '21:00 - 24:00'];

  hours = Array.from({ length: 8 }, () => Math.floor(Math.random() * 300)); // Random data for last 24 hours
  tons = Array.from({ length: 8 }, () => Math.floor(Math.random() * 1000)); // Random data for last 24 hours
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.initializeChart(this.hours, this.tons);
    this.updateChartData();
    setInterval(() => this.updateChartData(), 20000); // Update every 20 seconds
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
        categories: this.labels,
        title: {
          text: 'Hours'
        }
      },
      yAxis: {
        title: {
          text: 'Tons'
        }
      },
      series: [
        {
          name: 'Hours',
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
    // Generate random data for the last 3 hours
    let last3HoursHours = Array.from({ length: 1 }, () => Math.floor(Math.random() * 300));
    let last3HoursTons = Array.from({ length: 1 }, () => Math.floor(Math.random() * 1000));

    // Update the last 3 hours data in the existing arrays
    this.hours[7] = last3HoursHours[0];

    this.tons[7] = last3HoursTons[0];

    this.chart = new Chart({
      chart: {
        type: 'line',
        height: 450
      },
      title: {
        text: 'Tons produced over time'
      },
      xAxis: {
        categories: this.labels,
        title: {
          text: 'Hours'
        }
      },
      yAxis: {
        title: {
          text: 'Tons'
        }
      },
      series: [
        {
          name: 'Hours',
          type: 'line',
          color: '#044342',
          data: this.hours
        },
        {
          name: 'Tons',
          type: 'line',
          color: '#ed9e20',
          data: this.tons
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
}