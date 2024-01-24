import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CycleProductionService} from "../cycle-production.service";
import { CycleProduction} from "../cycle-production";
import { Subject } from 'rxjs';
import { FakerCycleProduction} from "../faker-cycle-production";
import { BehaviorSubject} from "rxjs";
import { FormsModule} from "@angular/forms";

@Component({
  selector: 'app-steps-component',
  template: `
    <div class="container">
      <div class="row">
        <div class="col">


          <ul class="list-unstyled">
            <li *ngFor="let state of states; let i = index">
              {{ state }}
              <mat-progress-bar mode="determinate" *ngIf="this.currentState==i" [value]="this.currentValue"></mat-progress-bar>
              <mat-progress-bar mode="determinate" *ngIf="this.currentState>i" [value]="100"></mat-progress-bar>
              <mat-progress-bar mode="determinate" *ngIf="this.currentState<i" [value]="0"></mat-progress-bar>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-5 col-12">
          <p>Cicli completati: {{cycle}}</p>
        </div>
        <div class="col-sm-7">

        </div>
      </div>

    </div>
  `,
  styles: [
  ]
})
export class StepsComponentComponent implements OnInit {

  public cycle: string = '0';
  public currentState: number = 0;
  public currentValue: number = 0;
  public cycleProduction!: CycleProduction;
  public cyclePro: CycleProduction[] = [];
  constructor(private cycleProductionService: CycleProductionService, private fakerCycleProduction: FakerCycleProduction) { }

  ngOnInit(): void {
    this.fakerCycleProduction.getDataObservable().subscribe((newData) => {
      if(newData != null) {
        this.cycleProduction = newData;
        console.log("Data emitted from getDataObs: ", newData);
        this.updateFields();
      } else {
        const currentDate = new Date();
        this.cycleProduction = {
          date: currentDate.toISOString(),
          currentState: '0',
          currentValue: '0',
          cycle: '0'
        };
        this.updateFields();
      }
    });
  }

  private updateFields() {
    this.currentState = this.mappingState(this.cycleProduction.currentState);
    this.currentValue = parseInt(this.cycleProduction.currentValue, 10);
    this.cycle = this.cycleProduction.cycle;
  }

  states = ['Flushing', 'Adding', 'Mixing', 'Cooking', 'Packaging'];

  getProgressBarMode(): string {
    if(this.currentValue === 0) {
      return 'indeterminate';
    } else {
      return 'determinate';
    }
  }

  getLatestCycleProduction(data: CycleProduction[]): CycleProduction{
    const currentDate = new Date();

    const filteredData = data.filter(item => item.date !== undefined && new Date(item.date) >= currentDate);

    const sortedData = filteredData.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

    const latestCycle = sortedData[0];
    return latestCycle;
  }

  mappingState(state: string): number {
    if(state =="Flushing") {
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
