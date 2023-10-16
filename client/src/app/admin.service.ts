import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Admin} from "./admin";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private url = 'http://localhost:5200';
    private employees$: Subject<Admin[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshAdmins() {
        this.httpClient.get<Admin[]>(`${this.url}/admins`)
            .subscribe(employees => {
                this.employees$.next(employees);
            });
    }

    getAdmins(): Subject<Admin[]> {
        this.refreshAdmins();
        return this.employees$;
    }

    getAdmin(email: string, password: string): Observable<Admin> {
        return this.httpClient.get<Admin>(`${this.url}/admins/${email}/${password}`);
    }
}
