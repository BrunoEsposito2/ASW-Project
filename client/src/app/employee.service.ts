import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Employee} from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:5200';
  private employees$: Subject<Employee[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshEmployees() {
    this.httpClient.get<Employee[]>(`${this.url}/employees`)
      .subscribe(employees => {
        this.employees$.next(employees);
      });
  }

  private getEmployeesPositions(){
    this.httpClient.get<Employee[]>(`${this.url}/employees/position`)
      .subscribe(employees => {
        this.employees$.next(employees);
      });
  }

  getEmployees(): Subject<Employee[]> {
    this.refreshEmployees();
    return this.employees$;
  }

  getEmployee(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.url}/employees/${id}`);
  }

  getEmployeeByInfo(name: string, position: string, password: string): Observable<{
    token: string,
    expiresIn: number,
    body: boolean
  }> {
    const authData = {
      name: name,
      position: position,
      password: password
    }
    return this.httpClient.post<{
      token: string,
      expiresIn: number,
      body: boolean
    }>(`${this.url}/employees/login`, authData);
  }

  createEmployee(employee: Employee): Observable<string> {
    return this.httpClient.post(`${this.url}/employees`, employee, { responseType: 'text' });
  }

  updateEmployee(id: string, employee: Employee): Observable<string> {
    return this.httpClient.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/employees/${id}`, { responseType: 'text' });
  }
}
