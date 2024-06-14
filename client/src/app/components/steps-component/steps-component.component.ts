import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CycleProductionService } from "../../services/cycle-production.service";
import { CycleProduction } from "../../cycle-production";
import { FakerCycleProduction } from "../../faker-cycle-production";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-steps-component',
  template: `
    <highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions!" style="display:flex;"></highcharts-chart>
    <p>Cicli completati: {{cycle}}</p>
  `,
  styles: [`
    p {
      font-size: 18px;
      font-weight: 430;
      line-height: 32px;
      font-family: Roboto, sans-serif;
      letter-spacing: .0125em;
      margin: 0 0 16px;
      text-align: center;
    }
  `]
})
export class StepsComponentComponent implements OnInit {
  public cycle: string = '0';
  public currentState: number = 0;
  public currentValue: number = 0;
  public cycleProduction!: CycleProduction;
  public cyclePro: CycleProduction[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options | undefined
  chart: any

  states = ['Flushing', 'Adding', 'Mixing', 'Cooking', 'Packaging'];

  constructor(
      private cycleProductionService: CycleProductionService,
      private fakerCycleProduction: FakerCycleProduction,
      private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initChart();
    this.fakerCycleProduction.getDataObservable().subscribe((newData) => {
      if(newData != null) {
        this.cycleProduction = newData;
        console.log("Data emitted from getDataObs: ", newData);
        this.updateFields();
        this.updateChart();
      } else {
        const currentDate = new Date();
        this.cycleProduction = {
          date: currentDate.toISOString(),
          currentState: '0',
          currentValue: '0',
          cycle: '0'
        };
        this.updateFields();
        this.updateChart();
      }
    });
  }

  private initChart() {
    this.chartOptions = {
      chart: {
        type: 'column',
        polar: true
      },
      title: {
        text: 'Cycle Production Progress',
        align: 'center'
      },
      pane: {
        size: '85%',
        innerSize: '20%',
        endAngle: 270
      },
      xAxis: {
        tickInterval: 1,
        labels: {
          //align: 'right',
          //useHTML: true,
          //allowOverlap: true,
          //step: 1,
          //y: 3,
          //style: {
          //fontSize: '13px'
          //}
        },
        lineWidth: 0,
        gridLineWidth: 0,
        categories: this.states
      },
      yAxis: {
        lineWidth: 0,
        tickInterval: 25,
        reversedStacks: false,
        endOnTick: true,
        showLastLabel: true,
        gridLineWidth: 0,
        min: 0,
        max: 100
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          borderWidth: 0,
          pointPadding: 0,
          groupPadding: 0.15,
          borderRadius: 5
        }
      },
      series: [{
        name: 'Progress',
        data: this.getProgressData()
      }] as Highcharts.SeriesOptionsType[]
    };
  }

  private updateChart() {
    this.chartOptions = {
      chart: {
        type: 'column',
        polar: true
      },
      title: {
        text: 'Cycle Production Progress',
        align: 'center'
      },
      pane: {
        size: '85%',
        innerSize: '20%',
        endAngle: 270
      },
      xAxis: {
        tickInterval: 1,
        lineWidth: 0,
        gridLineWidth: 0,
        categories: this.states
      },
      yAxis: {
        lineWidth: 0,
        tickInterval: 25,
        reversedStacks: false,
        endOnTick: true,
        showLastLabel: true,
        gridLineWidth: 0,
        min: 0,
        max: 100
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          borderWidth: 0,
          pointPadding: 0,
          groupPadding: 0.15,
          borderRadius: 5
        }
      },
      series: [{
        name: 'Progress',
        data: this.getProgressData()
      }] as Highcharts.SeriesOptionsType[]
    };
  }

  private getProgressData() {
    return this.states.map((state, index) => {
      if (index < this.currentState) {
        return 100;
      } else if (index === this.currentState) {
        return this.currentValue;
      } else {
        return 0;
      }
    });
  }

  private updateFields() {
    this.currentState = this.mappingState(this.cycleProduction.currentState);
    this.currentValue = parseInt(this.cycleProduction.currentValue, 10);
    this.cycle = this.cycleProduction.cycle;
  }

  mappingState(state: string): number {
    if(state == "Flushing") {
      return 0;
    } else if (state == "Adding") {
      return 1;
    } else if (state == "Mixing") {
      return 2;
    } else if (state == "Cooking") {
      return 3;
    } else if (state == "Packaging") {
      return 4;
    }
    return -1;
  }

  nextStep(): void {
    if(this.currentState < this.states.length) {
      this.currentState++;
    }
  }
}
