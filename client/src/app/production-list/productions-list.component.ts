import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Production} from '../production';
import {ProductionService} from '../production.service';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";

@Component({
    selector: 'app-productions-list',
    template: `
    <app-admin-navbar></app-admin-navbar>
    <h2 class="text-center m-5">Productions List</h2>

    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>KG Produced</th>
                <th>KG Waste</th>
                <th>Timestamp</th>
            </tr>
        </thead>

        <tbody>
            <tr *ngFor="let production of productions$ | async">
                <td>{{production.kg_produced}}</td>
                <td>{{production.kg_waste}}</td>
                <td>{{production.timestamp}}</td>
            </tr>
        </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['/productions/new-production']">Add a New Production</button>
    
    <app-floating-chat></app-floating-chat>
  `
})
export class ProductionsListComponent implements OnInit {
    productions$: Observable<Production[]> = new Observable();

    constructor(private productionService: ProductionService) { }

    ngOnInit(): void {
        this.fetchProductions();
    }

    deleteProduction(id: string): void {
        this.productionService.deleteProduction(id).subscribe({
            next: () => this.fetchProductions()
        });
    }

    private fetchProductions(): void {
        this.productions$ = this.productionService.getProductions();
    }
}
