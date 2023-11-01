import { Injectable } from '@angular/core';
import { Production } from '../production'
import { ProductionService } from '../production.service';

@Injectable({
    providedIn: 'root', // Configura il servizio come un servizio radice
})
export class FakerProductionService {
    constructor(private productionService: ProductionService) {}

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
                timestamp: new Date(now.getTime() - i * 60 * 60 * 1000) // sfalsa di un'ora indietro
            };

            productions.push(production);
            this.addProduction(production);
        }
    }

}
