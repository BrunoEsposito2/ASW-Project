import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Production } from './production';

@Injectable({
    providedIn: 'root'
})
export class ProductionService {
    private url = 'http://localhost:5200';
    private productions$: Subject<Production[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshProductions() {
        this.httpClient.get<Production[]>(`${this.url}/production`)
            .subscribe(productions => {
                this.productions$.next(productions);
            });
    }

    getProductions(): Subject<Production[]> {
        this.refreshProductions();
        return this.productions$;
    }

    getProduction(id: string): Observable<Production> {
        return this.httpClient.get<Production>(`${this.url}/production/${id}`);
    }

    createProduction(production: Production): Observable<string> {
        return this.httpClient.post(`${this.url}/production`, production, { responseType: 'text' });
    }

    updateProduction(id: string, production: Production): Observable<string> {
        return this.httpClient.put(`${this.url}/production/${id}`, production, { responseType: 'text' });
    }

    deleteProduction(id: string): Observable<string> {
        return this.httpClient.delete(`${this.url}/production/${id}`, { responseType: 'text' });
    }
}
