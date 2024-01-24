import { Injectable } from '@angular/core';
import { Production } from '../production'
import { ProductionService } from '../production.service';

import {interval, Subject, Subscription} from "rxjs";
import {CycleProduction} from "../cycle-production";
import {EmployeeOperatingData} from "../employee-operating-data";

@Injectable({
    providedIn: 'root', // Configura il servizio come un servizio radice
})
export class FakerProductionService {
    private updateSubscription: Subscription = new Subscription();
    private Active = false;
    constructor(private productionService: ProductionService) {}
    private dataSubject = new Subject<Production>();

    addProduction(production: Production) {
        this.productionService.createProduction(production).subscribe({
            next: () => {
                // La logica di reindirizzamento può essere spostata nel componente che utilizza il servizio.
            },
            error: (error) => {
                alert('Failed to create production');
                console.error(error);
            },
        });
    }

    calculateKgProduced(): number {
        return Math.floor(Math.random() * (500 - 100 + 1)) + 100; // genera un numero casuale tra 100 e 500
    }

    calculateKgWaste(): number {
        return Math.floor(Math.random() * (150 - 50 + 1)) + 50; // genera un numero casuale tra 50 e 150
    }

    generateProductions(): void {

        const productions: Production[] = [];
        const now = new Date();
        now.setHours(18, 0, 0, 0); // imposta l'orario alle 18:00 di oggi

        for (let i = 0; i < 100; i++) {
            const production: Production = {
                kg_produced: this.calculateKgProduced(),
                kg_waste: this.calculateKgWaste(),
                timestamp: new Date(now.getTime() - i * 60 * 60 * 1000).toISOString() // sfalsa di un'ora indietro
            };

            productions.push(production);
            this.addProduction(production);
        }
    }

    generateSingleProduction(): Production {
        const now: string = new Date().toString();

        const production: Production = {
            kg_produced: this.calculateKgProduced(),
            kg_waste: this.calculateKgWaste(),
            timestamp: now
        };
        this.addProduction(production);
        this.sendData(production);
        return production;
    }

    sendData(data: Production) {
        this.dataSubject.next(data);
    }

    getDataObservable() {
        return this.dataSubject.asObservable();
    }

    startUpdating(): void {
        this.Active = true;

        console.log("Cycle Production");

        this.updateSubscription = interval(15000).subscribe(() => {
            if(this.Active) {
                console.log("Creating Production");
                console.log(JSON.stringify(this.generateSingleProduction()));
            }
        });
    }

    stopUpdating(): void {
        this.Active = false;
        if(this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
    }

}
