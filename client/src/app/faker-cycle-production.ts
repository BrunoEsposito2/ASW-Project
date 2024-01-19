import { Injectable } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import {CycleProduction} from "./cycle-production";
import {CycleProductionService} from "./cycle-production.service";


@Injectable({
    providedIn: 'root'
})
export class FakerCycleProduction {
    private updateSubscription: Subscription = new Subscription();
    private Active = false;

    private dataSubject = new Subject<CycleProduction>();

    private productionStates: string[] = ['Flushing', 'Adding', 'Mixing', 'Cooking', 'Packaging'];
    private currentStateIndex = 0;
    private currentProgress = 0;
    private cycle = 0;
    public cycleProduction: CycleProduction[] = [];


    constructor(private cycleProductionservice: CycleProductionService) {}

    sendData(data: CycleProduction) {
        console.log("Dati emessi da getDataObs:", data);
        this.dataSubject.next(data);
    }


    getDataObservable() {
        return this.dataSubject.asObservable();
    }

    private getCycleProd(): number {
        this.cycleProductionservice.getCycleProduction().subscribe(
            (data) => {
                this.cycleProduction = data;
            },
            (error) => {
                console.error('Errore durante il recupero dei dati cycle-prod:', error);
            }
        );
        return Math.floor(Math.random() * 46);
    }

    private updateProgressAndState(): void {
        const randomNumber = this.getCycleProd();
        this.currentProgress += randomNumber;

        if (this.currentProgress >= 100) {
            this.currentProgress = 0;

            if (this.currentStateIndex === 4) {
                // Se lo stato corrente è 4, incrementa il ciclo di una unità
                this.cycle++;
            }

            // Aggiorna lo stato allo stato successivo
            this.currentStateIndex = (this.currentStateIndex + 1) % this.productionStates.length;
        }
    }

    private reset(): void {
        this.currentProgress = 0;
        this.currentStateIndex = 0;
    }

    private getCurrentState(): string {
        return this.productionStates[this.currentStateIndex];
    }

    private saveToDatabase(currentState: string, currentValue: string, cycle: string): void {
        const date = new Date().toISOString(); // Data e ora attuali
        const cycleProduction: CycleProduction = {
            date: date,
            currentState: currentState,
            currentValue: currentValue,
            cycle: cycle
        };
        this.cycleProduction.push(cycleProduction);
        this.sendData(cycleProduction);

        this.cycleProductionservice.createCycleProduction(cycleProduction).subscribe((result) => {
        });

    }

    getLatestCycleProduction(data: CycleProduction[]): CycleProduction {
        const currentDate = new Date();

        const filteredData = data.filter(item => item.date !== undefined && new Date(item.date) >= currentDate);

        const sortedData = filteredData.sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

        return sortedData[0];
    }

    mappingState(state: string): number {
        if (state == "Flushing") {
            return 0;
        } else if (state == "Adding") {
            return 1;
        } else if (state == "Mixing") {
            return 2;
        } else if (state == "Cooking") {
            return 3;
        } else if (state == "Packaging") {
            return 4;
        }

        return -1;
    }

    startUpdating(): void {
        this.Active = true;

        console.log("Cycle Production");

        this.cycleProductionservice.getCycleProduction().subscribe(
            (data) => {
                if(this.getLatestCycleProduction(data) != null) {


                    const latestCycleProduction = this.getLatestCycleProduction(data);

                    if (latestCycleProduction) {
                        // Ci sono dati nel database, inizia dalla loro posizione
                        this.currentStateIndex = this.mappingState(latestCycleProduction.currentState);
                        this.currentProgress = parseInt(latestCycleProduction.currentValue, 10);
                        this.cycle = parseInt(latestCycleProduction.cycle, 10);

                        console.log("Iniziando dal record nel database:", latestCycleProduction);
                    }
                }

        });


        this.updateSubscription = interval(5000).subscribe(() => {
            if (this.Active) {
                this.updateProgressAndState();
                console.log("Sto ciclando");
                // Chiamare qui il codice per generare i dati con lo stato corrente
                const currentState = this.getCurrentState();
                const currentValue = this.currentProgress.toString();
                const cycle = this.cycle;
                console.log(`Current State: ${currentState}, Progress: ${this.currentProgress}`);

                // Chiamare il metodo saveToDatabase per salvare i dati
                this.saveToDatabase(currentState, currentValue, cycle.toString());

                if (this.currentStateIndex === 0 && this.currentProgress === 0) {
                    // Se siamo tornati allo stato iniziale, potresti voler eseguire qualche azione di reset
                    this.reset();
                }
            }
        });
    }

    stopUpdating(): void {
        this.Active = false;
        if (this.updateSubscription) {
            this.updateSubscription.unsubscribe();
        }
    }
}
