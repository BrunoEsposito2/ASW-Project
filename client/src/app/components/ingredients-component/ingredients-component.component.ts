import {Component, OnInit} from '@angular/core';
import {Highcharts} from "highcharts/modules/map";
import {Chart} from "angular-highcharts";

@Component({
  selector: 'app-ingredients-component',
  template: `
    <div class="container less-padding">
      <figure class="highcharts-figure">
        <div id="container" [chart]="chart"></div>
      </figure>
    </div>
  `,
  styles: [`
    
  `]
})
export class IngredientsComponentComponent implements OnInit {

  chartOptions: any;
  chart: any;
  ingredients: any[] = [];
  dataHistory: { [key: string]: number[] } = {};

  constructor() { }

  ngOnInit(): void {
    const acqua = { name: 'Water', quantity: 10800 };
    const farina = { name: 'Flour', quantity: 5000 };
    const zucchero = { name: 'Sugar', quantity: 20500 };
    this.ingredients.push(acqua, farina, zucchero);

    // Initialize data history with the initial quantities
    this.ingredients.forEach(ingredient => {
      this.dataHistory[ingredient.name] = this.generateInitialQuantities(ingredient.quantity);
    });

    this.initializeChart();
    this.updateQuantities();
  }

  generateInitialQuantities(baseQuantity: number): number[] {
    const quantities = [];
    for (let i = 0; i < 5; i++) {
      let quantity = Math.floor(Math.random() * (baseQuantity / 2)) + (baseQuantity / 2);
      quantities.push(quantity);
    }
    return quantities;
  }

  initializeChart(): void {
    this.chartOptions = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Ingredients Amount'
      },
      xAxis: {
        categories: this.getLastFiveDays()
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Quantity'
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: this.ingredients.map(ingredient => ({
        type: 'bar',
        name: ingredient.name,
        data: this.dataHistory[ingredient.name]
      })) as Highcharts.SeriesOptionsType[]
    };

    this.chart = new Chart(this.chartOptions);
  }

  getLastFiveDays(): string[] {
    const dates = [];
    for (let i = 4; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }

  updateQuantities(): void {
    setInterval(() => {
      this.ingredients.forEach(ingredient => {
        const change = Math.floor(Math.random() * (10000 - 1500 + 1)) + 1500;
        const lastIndex = this.dataHistory[ingredient.name].length - 1;
        this.dataHistory[ingredient.name][lastIndex] = change;
        if (this.dataHistory[ingredient.name][lastIndex] < 0) {
          this.dataHistory[ingredient.name][lastIndex] = 0;
        }
      });

      this.updateChart();
    }, 5000);
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.destroy()
      this.initializeChart()
    }

    const newCategories = this.getLastFiveDays();
    this.chart.xAxis[0].setCategories(newCategories, false);

    this.ingredients.forEach((ingredient, index) => {
      const newData = this.dataHistory[ingredient.name];
      this.chart.series[index].setData(newData, false);
    });

    //this.chart.redraw();
  }
}
