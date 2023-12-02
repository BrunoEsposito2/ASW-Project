import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Admin} from "./admin";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private url = 'http://localhost:5200';
    private admins$: Subject<Admin[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshAdmins() {
        this.httpClient.get<Admin[]>(`${this.url}/admins`)
            .subscribe(admins => {
                this.admins$.next(admins);
            });
    }

    getAdmins(): Subject<Admin[]> {
        this.refreshAdmins();
        return this.admins$;
    }

    getAdmin(email: string, password: string): Observable<{
        token: string,
        expiresIn: number,
        body: boolean
    }> {
        return this.httpClient.get<{
            token: string,
            expiresIn: number,
            body: boolean
        }>(`${this.url}/admins/${email}/${password}`);
    }
}
