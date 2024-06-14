import {Component, Input} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {FakerEmployeeDataService} from "../../faker-employee-data";
import {EmployeeOperatingData} from "../../employee-operating-data";
import {Employee} from "../../employee";


@Component({
  selector: 'app-dashboard',
  template: `
    <div class="body" [ngClass]="getBodyClass()">
      <div class="top-section">
        <app-assistants-component></app-assistants-component>
      </div>
      <div class="middle-section">
        <div class="widget right">
          <app-power-unit-charts-component></app-power-unit-charts-component>
        </div>
      </div>
      <div class="middle-section">
        <div id="mixer" class="widget left">
          <app-mixer-unit-component></app-mixer-unit-component>
        </div>
        <div id="chart-component" class="widget left">
          <app-charts-component></app-charts-component>
        </div>
      </div>
      <div class="middle-section">
        <div class="widget right">
          <app-ingredients-component></app-ingredients-component>
        </div>
        <div class="widget right">
          <app-steps-component></app-steps-component>
        </div>
      </div>
    </div>

    <div class="toast-container">
      <ngb-toast
          (hidden)="isToastVisible = false"
          [ngClass]="{'d-block': isToastVisible, 'd-none': !isToastVisible}">
        <div [ngClass]="'toast show toast-custom'">
          <div class="toast-header toast-custom alert-custom">
            <strong class="toast-title">Alert</strong>
            <small class="text-white">{{ currentTime }}</small>
            <button class="btn-close close-custom" (click)="isToastVisible = false" aria-label="Close">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="toast-body body-toast">
            {{ messageToast }}
          </div>
        </div>
      </ngb-toast>
    </div>
  `,
  styleUrls: ['./dashboard.component.style.scss']
})

export class DashboardComponent {
  @Input() collapsed = false
  @Input() screenWidth = 0

  isToastVisible = false;
  private operatingdata: EmployeeOperatingData[] = [];
  public employees: Employee[] = [];
  private alertTemperature = 37;
  private alertSaturation = 92;
  public messageToast: string = '';
  public currentTime: string = '';

  showToast() {
    this.isToastVisible = true;
  }

  constructor(private employeesService: EmployeeService,
              private fakerEmployeeOpData: FakerEmployeeDataService) { }
  ngOnInit(): void {

    this.employeesService.getEmployees().subscribe(
        (data) => {
          this.employees = data;
        },
        (error) => {
          console.error('Errore durante il recupero dei dati degli operatori:', error);
        }
    );

    this.fakerEmployeeOpData.getDataObservable().subscribe((newData) => {
      this.operatingdata = newData;

      this.operatingdata.forEach((elem) => {
        const employeeId = elem.id_employee;

        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        if(minutes<10) {
          this.currentTime = hours + ":0" + minutes;
        } else {
          this.currentTime = hours + ":" + minutes;
        }


        const matchingEmployee = this.employees.find((employee) => employee._id === employeeId);

        if (matchingEmployee) {
          const employeeName = matchingEmployee.name;

          // @ts-ignore
          if (elem.saturation < this.alertSaturation) {
            this.messageToast = `Errore, saturazione di: ${elem.saturation?.toPrecision(4)}, valore basso per ${employeeName}`;
            this.showToast();
          }

          // @ts-ignore
          if (elem.temperature > this.alertTemperature) {
            this.messageToast = `Allarme! Temperatura di: ${elem.temperature?.toPrecision(4)}°C, valore alto per ${employeeName}`;
            this.showToast();
          }
        }
      });
    });

  }

  getBodyClass() {
    let styleClass = ''
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass
  }




}
