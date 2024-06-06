import { Observable } from 'rxjs';
import { Production} from "../../production";
import { ProductionService} from "../../services/production.service";
import { AddProductionComponent} from "../add-production/add-production-component";
import { HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { Component } from '@angular/core';

@Component({
    selector: 'app-faker-production', // Seleziona un selettore appropriato
    template: `
    <!-- Il template del tuo componente -->
  `,
    // ... altri metadati del componente
})

export class FakerProductionComponent {
    constructor(
        private router: Router,
        private productionService: ProductionService
    ) { }

    addProduction(production: Production) {
        this.productionService.createProduction(production)
            .subscribe({
                next: () => {
                    this.router.navigate(['/productions']);
                },
                error: (error) => {
                    //alert("Failed to create production");
                    console.error(error);
                }
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
}