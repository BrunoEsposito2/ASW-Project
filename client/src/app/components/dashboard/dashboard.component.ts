import {Component, Input} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {FakerEmployeeDataService} from "../../faker-employee-data";
import {EmployeeOperatingData} from "../../employee-operating-data";
import {Employee} from "../../employee";


@Component({
  selector: 'app-dashboard',
  template: `
    <ngb-toast
        (hidden)="isToastVisible = false"
        [ngClass]="isToastVisible ? 'd-block' : 'd-none'">
      <div [ngClass]="'toast show toast-custom'">
        <div class="toast-header toast-custom alert-custom">
          <strong class="me-auto text-white">Alert</strong>
          <small class="text-white">{{currentTime}}</small>
          <button type="button" class="btn-close close-custom" (click)="isToastVisible = false" aria-label="Close"></button>
        </div>
        <div class="toast-body body-toast">
          {{messageToast}}
        </div>
      </div>
    </ngb-toast>
    
    <div class="body" [ngClass]="getBodyClass()">
      <div class="top-section">
        <app-assistants-component></app-assistants-component>
      </div>
      <div class="middle-section">
        <div class="widget left">
          <app-charts-component></app-charts-component>
        </div>
        <div class="widget right">
          <app-mixer-unit-component></app-mixer-unit-component>
        </div>
      </div>
    </div>
    
    <!--<section id="main" style="height: 88vh; overflow: hidden;">
      <div class="row">
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Productivity component</div>
            <div class="card-body">
              <app-charts-component></app-charts-component>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Mixer unit component</div>
            <div class="card-body">
              <app-mixer-unit-component class="d-flex justify-content-center"></app-mixer-unit-component>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Assistants component</div>
            <div class="card-body less-padding">
              <app-assistants-component></app-assistants-component>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Power unit component</div>
            <div class="card-body">
              <app-power-unit-component></app-power-unit-component>
              <app-power-unit-charts-component></app-power-unit-charts-component>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Ingredients component </div>
            <div class="card-body">
              <app-ingredients-component></app-ingredients-component>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Steps component</div>
            <div class="card-body">
              <app-steps-component>
              </app-steps-component>
            </div>
          </div>
        </div>
      </div>
    </section>-->
    <!--<button (click)="showToast()" class="btn btn-primary">Mostra Toast</button>-->
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
