import {Component, OnInit} from '@angular/core';
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import { FakerEmployeeDataService } from "../faker-employee-data";
import {EmployeeOperatingData} from "../employee-operating-data";

@Component({
  selector: 'app-assistants-component',
  template: `
    <div class="row">
      <div class="col-md-6" *ngFor="let employee of employees; let i = index">
        <div class="card bg-light" *ngIf="i < 2">
          <div class="tooltip-container">
            <img [src]="employee.img" style="width:90px; height:120px" class="card-img-top mx-auto d-block" matTooltip="{{ employee.name }}" [alt]="employee.name">
          </div>
          <div class="card-body">
            <h5 class="card-text custom-font"> Nome: {{ employee.name }}</h5>
            <p class="card-text custom-font"> Livello: {{ employee.level }}</p>
            <ng-container *ngIf="employee._id">
              <ng-container *ngFor="let data of getOperatingData(employee._id)">
                <p class="card-text custom-font">
                  <img src="../../assets/icons8-cloud-refresh.gif" style="width:30px;height:30px" alt="Icona" [matTooltip]="'Latitude: ' + data.latitude + ', Longitude: ' + data.longitude + ', Temperature: ' + data.temperature + ', Saturation: ' + data.saturation + ', Time: ' + data.timeIn">
                  Dati Realtime
                </p>
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
    });

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
