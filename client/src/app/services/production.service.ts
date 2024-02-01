import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Production } from '../production';

@Injectable({
    providedIn: 'root'
})
export class ProductionService {
    private url = 'http://localhost:5200';
    public productions$: Subject<Production[]> = new Subject();
    private index = 0;
    private size = 20;

    constructor(private httpClient: HttpClient) { }

    public refreshProductions() {
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

        production = {
            kg_produced: production.kg_produced,
            kg_waste: production.kg_waste,
            timestamp: new Date().toISOString(),
        };



        console.log("service " + `${this.url}/production` + JSON.stringify(production));
        return this.httpClient.post(`${this.url}/production`, production, { responseType: 'text' });
    }

    updateProduction(id: string, production: Production): Observable<string> {
        return this.httpClient.put(`${this.url}/production/${id}`, production, { responseType: 'text' });
    }

    deleteProduction(id: string): Observable<string> {
        return this.httpClient.delete(`${this.url}/production/${id}`, { responseType: 'text' });
    }

    public refreshPaginateProductions(index: number = 0, size: number = 20) {
        this.httpClient.get<Production[]>(`${this.url}/production?index=${index}&size=${size}`)
            .subscribe(productions => {
                this.productions$.next(productions);
            });
    }

    public getProductionsPaginate(index: number = 0, size: number = 20): Subject<Production[]> {
        this.refreshPaginateProductions(index, size);
        return this.productions$;
    }


}
