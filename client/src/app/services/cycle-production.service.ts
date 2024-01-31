import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CycleProduction } from "../cycle-production";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CycleProductionService {
    private url = 'http://localhost:5200'; // Assicurati di aggiornare l'URL con il tuo endpoint del backend
    private cycleProduction$: Subject<CycleProduction[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshCycleProduction() {
        this.httpClient.get<CycleProduction[]>(`${this.url}/cycle-production`)
            .subscribe(cycleProduction => {
                this.cycleProduction$.next(cycleProduction);
            });
    }

    getCycleProduction(): Subject<CycleProduction[]> {
        this.refreshCycleProduction();
        return this.cycleProduction$;
    }

    createCycleProduction(cycleProduction: CycleProduction): Observable<string> {

        return this.httpClient.post(`${this.url}/cycle-production`, cycleProduction, { responseType: 'text' })
            .pipe(
                catchError(error => {
                    console.error('Errore durante la creazione di CycleProduction:', error);
                    return throwError('Si è verificato un errore durante la creazione di CycleProduction.');
                })
            );
    }

    updateCycleProduction(id: string, cycleProduction: CycleProduction): Observable<string> {
        return this.httpClient.put(`${this.url}/cycle-production/${id}`, cycleProduction, { responseType: 'text' });
    }

    deleteCycleProduction(id: string): Observable<string> {
        return this.httpClient.delete(`${this.url}/cycle-production/${id}`, { responseType: 'text' });
    }
}
