import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Productivity } from './productivity';

@Injectable({
    providedIn: 'root'
})
export class ProductivityService {
    private url = 'http://localhost:5200';
    private productivities$: Subject<Productivity[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshProductivity() {
        this.httpClient.get<Productivity[]>(`${this.url}/Productivity`)
            .subscribe(productivity => {
                this.productivities$.next(productivity);
            });
    }

    getProductivity(): Subject<Productivity[]> {
        this.refreshProductivity();
        return this.productivities$;
    }

    getProductivities(id: string): Observable<Productivity> {
        return this.httpClient.get<Productivity>(`${this.url}/productivities/${id}`);
    }

    createProductivities(productivity: Productivity): Observable<string> {
        return this.httpClient.post(`${this.url}/employees`, productivity, { responseType: 'text' });
    }

    updateProductivities(id: string, productivity: Productivity): Observable<string> {
        return this.httpClient.put(`${this.url}/employees/${id}`, productivity, { responseType: 'text' });
    }

    deleteProductivities(id: string): Observable<string> {
        return this.httpClient.delete(`${this.url}/productivities/${id}`, { responseType: 'text' });
    }
}
