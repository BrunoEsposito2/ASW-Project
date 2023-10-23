import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Production } from '../production';
import { ProductionService } from '../production.service';

@Component({
    selector: 'app-add-production',
    template: `
    <h2 class="text-center m-5">Add a New Production</h2>
    <app-production-form (formSubmitted)="addProduction($event)"></app-production-form>
  `
})
export class AddProductionComponent {
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
                    alert("Failed to create production");
                    console.error(error);
                }
            });
    }
}