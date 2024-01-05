import {Component, Injectable} from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { Employee } from "./employee";
import { EmployeeService } from "./employee.service";
import { EmployeeOperatingDataService } from "./employee.operating.data.service";
import { EmployeeOperatingData } from "./employee-operating-data";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakerEmployeeDataService {
  private updateSubscription: Subscription = new Subscription();
  private Active = false;
  public employees: Employee[] = [];
  private operatingdata: EmployeeOperatingData[] = [];
  private dataSubject = new Subject<EmployeeOperatingData[]>();
  private generatedEmployees = false;

  constructor( private employeesService: EmployeeService,
               private employeesOperatingDataService: EmployeeOperatingDataService ) { }

  private getRandomOperators(): Employee[] {
    if (this.employees.length < 2) {
      throw new Error('Non ci sono abbastanza operatori nel database.');
    }

    const randomIndexes = this.getRandomIndexes(this.employees.length, 2); // Genera due indici casuali
    const randomOperators = [this.employees[randomIndexes[0]], this.employees[randomIndexes[1]]];

    return randomOperators;
  }
  ngOnInit(): void {
    if (!this.generatedEmployees) {
      this.employeesService.getEmployees().subscribe(
          (data) => {
            this.employees = data;
            this.generatedEmployees = true;
          },
          (error) => {
            console.error('Errore durante il recupero dei dati degli operatori:', error);
          }
      );
    }

  }
  private async getRandomOperatorsFromDatabase(): Promise<Employee[]> {
    this.employeesService.getEmployees().subscribe(
        (data) => {
          this.employees = data;
        },
        (error) => {
          console.error('Errore durante il recupero dei dati degli operatori:', error);
        }
    );
    if (this.employees.length < 2) {
      throw new Error('Non ci sono abbastanza operatori nel database.');
    }

    const randomIndexes = this.getRandomIndexes(this.employees.length, 2); // Genera due indici casuali
    //const randomOperators = [this.employees[randomIndexes[0]], this.employees[randomIndexes[1]]];
    //Settato di default il primo e secondo operatore
    const randomOperators = [this.employees[0], this.employees [1]];

    return randomOperators;
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

  private getRandomTemperature(): number {
    // Genera una temperatura casuale tra 36.5 e 37.2
    return 36.5 + Math.random() * (37.2 - 36.5);
  }

  sendData(data: EmployeeOperatingData[]) {
    this.dataSubject.next(data);
  }

  getDataObservable() {
    return this.dataSubject.asObservable();
  }

  private getRandomSaturation(): number {
    // Genera una saturazione casuale tra 90 e 99
    return 90 + Math.random() * (99 - 90);
  }

  private getRandomLatitude(): string {
    // Genera una latitudine casuale
    // Ad esempio, generiamo un valore tra 44.400 e 44.450
    const latitude = 0 + Math.random() * (500);
    return latitude.toFixed(6); // Formattiamo il valore a 6 decimali
  }

  private getRandomLongitude(): string {
    // Genera una longitudine casuale
    // Ad esempio, generiamo un valore tra 12.150 e 12.200
    const longitude = 0 + Math.random() * (1000);
    return longitude.toFixed(6); // Formattiamo il valore a 6 decimali
  }

  private getCurrentTime(): string {
    const now = new Date();
    // Formattiamo l'orario attuale come "YYYY-MM-DD HH:MM:SS"
    const formattedTime = `${now.getFullYear()}-${this.formatNumber(now.getMonth() + 1)}-${this.formatNumber(now.getDate())} ${this.formatNumber(now.getHours())}:${this.formatNumber(now.getMinutes())}:${this.formatNumber(now.getSeconds())}`;
    return formattedTime;
  }

  private formatNumber(value: number): string {
    // Formattiamo il numero aggiungendo uno zero iniziale se è inferiore a 10
    return value < 10 ? `0${value}` : `${value}`;
  }

  startUpdatingDatabase(): void {
    this.Active = true;
    console.log("Let's start");
    this.updateSubscription = interval(5000).subscribe(() => {
      if (this.Active) {
        const randomOperatorsPromise = this.getRandomOperatorsFromDatabase();

        randomOperatorsPromise.then((randomOperators) => {
          randomOperators.forEach((operator) => {
            const randomTemperature = this.getRandomTemperature();
            const randomLongitude = this.getRandomLongitude();
            const randomLatitude = this.getRandomLatitude();
            const randomSaturation = this.getRandomSaturation();
            const currentTime = this.getCurrentTime();
            const id_employee = operator._id || '';

            // Crea un oggetto EmployeeOperatingData con dati casuali
            const randomEmployeeData: EmployeeOperatingData = {
              id_employee: id_employee, // Usa l'ID dell'operatore
              temperature: randomTemperature,
              longitude: randomLongitude,
              latitude: randomLatitude,
              saturation: randomSaturation,
              timeIn: currentTime,
            };


            this.operatingdata.push(randomEmployeeData);
            // Chiama il servizio per inserire i dati nel database
            this.employeesOperatingDataService.createEmployeeOperatingData(randomEmployeeData).subscribe((result) => {
            });
          });
          console.log("Faker:" + this.operatingdata);
          this.sendData(this.operatingdata);
          this.operatingdata = [];
        });
      }
    });
  }

  stopUpdatingDatabase(): void {
    this.Active = false;
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  public isActive(): boolean {
    return this.Active;
  }

  public getEmployees() {
    return this.employees;
  }
}
