import { Component, OnInit } from '@angular/core';
import { Employee } from "../../employee";
import { EmployeeService } from "../../services/employee.service";
import { FakerEmployeeDataService } from "../../faker-employee-data";
import { EmployeeOperatingData } from "../../employee-operating-data";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-assistants-component',
  template: `
    <div class="widget-container" *ngFor="let employee of employees; let i = index">
      <div class="widget green" *ngIf="employee._id && i < 2">
        <img class="icon" [src]="employee.img" matTooltip="{{ employee.position }}" [alt]="employee.name">
        <div class="value">
          <div class="top">{{ employee.name }}</div>
          <div class="bottom">{{ employee.level }}</div>
        </div>
        <div class="data" *ngIf="employee._id">
          <div class="accordion-body less-padding" style="gap: 0.2rem; background-color: transparent; color: white; display: flex; flex-direction: column;">
            <div style="display: inline-flex; justify-content: space-between;">
              <img src="../../assets/icons8-temperature-64.png" title="Temperatura" class="icon-small" alt="Icona Temperatura">
              {{ accordionData[employee._id]?.temperature | number:'1.1-2' }}
            </div>
            <div style="display: inline-flex; justify-content: space-between;">
              <img src="../../assets/icons8-saturation-96.png" title="Saturazione" class="icon-small" alt="Icona Saturazione">
              {{ accordionData[employee._id]?.saturation | number:'1.1-2' }}
            </div>
            <div style="display: inline-flex; justify-content: space-between;">
              <img src="../../assets/icons8-time-100.png" title="Data/Ora" class="icon-small" alt="Icona Data/Ora">
              {{ accordionData[employee._id]?.timeIn }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../pro-version/top-widgets/top-widgets.component.scss']
})
export class AssistantsComponentComponent implements OnInit {

  public employees: Employee[] = [];
  public accordionData: { [id: string]: any } = {};
  private operatingdata: EmployeeOperatingData[] = [];

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
      this.updateEmployeeData();
    });
  }

  private updateEmployeeData() {
    this.employees.forEach(employee => {
      if (employee._id) {
        this.updateEmployeeAccordionData(employee._id);
      }
    });
  }

  private updateEmployeeAccordionData(employeeId: string) {
    const employeeOperatingData = this.operatingdata.filter(item => item.id_employee === employeeId);
    this.accordionData[employeeId] = employeeOperatingData.length > 0 ? employeeOperatingData[0] : null;
  }
}
