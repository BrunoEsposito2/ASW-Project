import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { EmployeeOperatingData } from '../employee-operating-data';

@Injectable({
    providedIn: 'root'
})
export class EmployeeOperatingDataService {
    private url = 'http://localhost:5200';
    private employeeOperatingData$: Subject<EmployeeOperatingData[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshEmployeeOperatingData() {
        this.httpClient.get<EmployeeOperatingData[]>(`${this.url}/employee-operating-data`)
            .subscribe(employeeOperatingData => {
                this.employeeOperatingData$.next(employeeOperatingData);
            });
    }

    getEmployeeOperatingData(): Subject<EmployeeOperatingData[]> {
        this.refreshEmployeeOperatingData();
        return this.employeeOperatingData$;
    }

    getEmployeeOperatingDataByEmployeeId(id: string): Observable<EmployeeOperatingData[]> {
        return this.httpClient.get<EmployeeOperatingData[]>(`${this.url}/employee-operating-data/${id}`);
    }

    createEmployeeOperatingData(employeeOperatingData: EmployeeOperatingData): Observable<string> {
        return this.httpClient.post(`${this.url}/employee-operating-data`, employeeOperatingData, { responseType: 'text' });
    }

    updateEmployeeOperatingData(id: string, employeeOperatingData: EmployeeOperatingData): Observable<string> {
        return this.httpClient.put(`${this.url}/employee-operating-data/${id}`, employeeOperatingData, { responseType: 'text' });
    }

    deleteEmployeeOperatingData(id: string): Observable<string> {
        return this.httpClient.delete(`${this.url}/employee-operating-data/${id}`, { responseType: 'text' });
    }
}
