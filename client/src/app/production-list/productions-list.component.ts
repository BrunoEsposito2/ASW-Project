import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Production} from '../production';
import {ProductionService} from '../production.service';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";

@Component({
    selector: 'app-productions-list',
    template: `
    <app-admin-navbar></app-admin-navbar>
    <h2 class="text-center m-4">Productions List</h2>

    <div class="table-responsive" style="height: 410px; overflow-y: scroll;">
        <table class="table table-bordered mb-0 bg-white">
            <thead class="bg-light sticky-top">
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
    </div>
    
    <button class="btn btn-primary mt-4" [routerLink]="['/productions/new-production']">Add a New Production</button>
    
    <app-floating-chat></app-floating-chat>
    <app-footer></app-footer>
  `,
    styleUrls: ['./productions-list.component.scss']
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
