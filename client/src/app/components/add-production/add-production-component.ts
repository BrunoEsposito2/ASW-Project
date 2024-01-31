import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Production } from '../../production';
import { ProductionService } from '../../services/production.service';
import { FakerProductionComponent } from '../faker-production/faker-production.component';
import { FakerProductionService } from '../../services/faker-production-service/faker.production.service'

@Component({
    selector: 'app-add-production',
    template: `
        <h2 class="text-center m-5">Add a New Production</h2>
        <app-production-form (formSubmitted)="addProduction($event)"></app-production-form>
        <button (click)="generateProductions()">Genera Produzioni</button>
    `
})
export class AddProductionComponent {
    constructor(
        private router: Router,
        private productionService: ProductionService,
        private fakerProductionService: FakerProductionService
    ) { }

    generateProductions(): void {
        // Chiama il metodo generateProductions() del servizio
        this.fakerProductionService.generateProductions();
    }

    addProduction(production: Production) {
        if(!production.timestamp) {
            production.timestamp = new Date().toISOString();
        }
        this.productionService.createProduction(production)
            .subscribe({
                next: () => {
                    this.router.navigate(['/productions']);
                },
                error: (error) => {
                    alert("Failed to create production");
                    console.error(error);
                }
            });
    }


}


