import {Component, OnInit} from '@angular/core';
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import { FakerEmployeeDataService } from "../faker-employee-data";
import {EmployeeOperatingData} from "../employee-operating-data";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-assistants-component',
  template: `
    <div class="row">
      <div class="col-md-6" *ngFor="let employee of employees; let i = index">
        <div class="card bg-light" *ngIf="i < 2">
          <div class="tooltip-container">
            <img [src]="employee.img" style="width:80px; height:100px" class="card-img-top mx-auto d-block" matTooltip="{{ employee.position }}" [alt]="employee.name">
          </div>
          <div class="card-body less-padding">
            <p class="card-text custom-font"> Nome: {{ employee.name }}</p>
            <p class="card-text custom-font"> Livello: {{ employee.level }}</p>
            <div class="accordion" *ngIf="employee._id && isAccordionOpen[employee._id]">
              <div class="accordion-item">
                <h2 class="accordion-header" id="accordion-header">
                  <button class="accordion-button less-padding" type="button" (click)="closeAccordion(employee)">
                    <img src="../../assets/icons8-cloud-refresh.gif" style="width:30px;height:30px; margin-right:5px" alt="Icona"> Dati Realtime
                  </button>
                </h2>
                <div class="accordion-collapse collapse show" id="accordion-collapse">
                  <div class="accordion-body less-padding">
                  <img src="../../assets/icons8-gps.png" style="width: 20px; height: 20px;" alt="Latitude Icon" *ngIf="employee._id">
                  {{ accordionData[employee._id]?.latitude }} - {{ accordionData[employee._id]?.longitude }}<br>
                  <img src="../../assets/icons8-temperature-64.png" style="width: 20px; height: 20px;" alt="Temperature Icon" *ngIf="employee._id">
                  {{ accordionData[employee._id]?.temperature | number:'1.1-2' }}<br>
                  <img src="../../assets/icons8-saturation-96.png" style="width: 20px; height: 20px;" alt="Saturation Icon" *ngIf="employee._id">
                  {{ accordionData[employee._id]?.saturation | number:'1.1-2' }}<br>
                  <img src="../../assets/icons8-time-100.png" style="width: 20px; height: 20px;" alt="Time Icon" *ngIf="employee._id">
                  {{ accordionData[employee._id]?.timeIn }}
                </div>
                </div>
              </div>
            </div>
            <ng-container *ngIf="employee._id">
              <ng-container *ngIf="getOperatingData(employee._id) as operatingData">
                <ng-container *ngFor="let data of operatingData">
                  <p id="dati-realtime" class="card-text custom-font" *ngIf="!employee._id || !isAccordionOpen[employee._id]">
                    <img src="../../assets/icons8-cloud-refresh.gif" style="width:30px;height:30px; margin-right:5px" alt="Icona" (click)="openAccordion(employee)">
                    Dati Realtime
                  </p>
                </ng-container>
              </ng-container>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AssistantsComponentComponent implements OnInit {

  private operatingdata: EmployeeOperatingData[] = [];
  constructor(private employeesService: EmployeeService,
              private fakerEmployeeOpData: FakerEmployeeDataService) { }

  public employees: Employee[] = [];
  public isAccordionOpen: { [id: string]: boolean } = {};
  public accordionData: { [id: string]: any } = {};

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe(
        (data) => {
          this.employees = data;
        },
        (error) => {
          console.error('Errore durante il recupero dei dati degli operatori:', error);
        }
    );
    this.employees = this.getEmployees();

    this.fakerEmployeeOpData.getDataObservable().subscribe((newData) => {
      this.operatingdata = newData;
      console.log(this.operatingdata);

      for (let employeeId in this.isAccordionOpen) {
        if (this.isAccordionOpen[employeeId]) {
          this.updateEmployeeAccordionData(employeeId);
        }
      }

    });

  }

  openAccordion(employee: any) {
    this.isAccordionOpen[employee._id] = true;
    this.updateEmployeeAccordionData(employee._id);
  }

  updateEmployeeAccordionData(employeeId: string) {
    const employeeOperatingData = this.operatingdata.filter(item => item.id_employee === employeeId);
    this.accordionData[employeeId] = employeeOperatingData.length > 0 ? employeeOperatingData[0] : null;
  }

// Funzione per chiudere l'accordion
  closeAccordion(employee: any): void {
    this.isAccordionOpen[employee._id] = false;
    this.accordionData[employee._id] = {};
  }
  getOperatingData(employeeId: string): EmployeeOperatingData[] {
    return this.operatingdata.filter(item => item.id_employee === employeeId);
  }

  private getRandomOperators(): Employee[] {
    if (this.employees.length < 2) {
      throw new Error('Non ci sono abbastanza operatori nel database.');
    }

    const randomIndexes = this.getRandomIndexes(this.employees.length, 2); // Genera due indici casuali
    const randomOperators = [this.employees[randomIndexes[0]], this.employees[randomIndexes[1]]];

    return randomOperators;
  }

  public getEmployees() {
    return this.employees;
  }

  toggleAccordion(index: number) {
    this.isAccordionOpen[index] = !this.isAccordionOpen[index];
  }

  private getRandomIndexes(max: number, count: number): number[] {
    const randomIndexes: number[] = [];
    while (randomIndexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    return randomIndexes;
  }
}
