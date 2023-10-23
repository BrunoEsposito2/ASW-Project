import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Production } from '../production';
import {Employee} from "../employee";

@Component({
    selector: 'app-production-form',
    template: `
    <form class="production-form" autocomplete="off" [formGroup]="productionForm" (ngSubmit)="submitForm()">
        
      <div class="form-floating mb-3">
        <input class="form-control" type="number" id="kg_produced" formControlName="kg_produced" placeholder="Kg Produced" required>
        <label for="kg_produced">Kg Produced</label>
      </div>

      <div *ngIf="kg_produced.invalid && (kg_produced.dirty || kg_produced.touched)" class="alert alert-danger">
        <div *ngIf="kg_produced.errors?.['required']">
          Kg Produced is required.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="number" id="kg_waste" formControlName="kg_waste" placeholder="Kg Waste" required>
        <label for="kg_waste">Kg Waste</label>
      </div>

      <div *ngIf="kg_waste.invalid && (kg_waste.dirty || kg_waste.touched)" class="alert alert-danger">
        <div *ngIf="kg_waste.errors?.['required']">
          Kg Waste is required.
        </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="productionForm.invalid">Add</button>
    </form>
  `,
    styles: [
        `.production-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
    ]
})

export class ProductionFormComponent implements OnInit {
    /*@Input()
    initialState: BehaviorSubject<Production> = new BehaviorSubject<Production>({
        _id: '1', // Inserisci un valore iniziale per _id
        kg_produced: 0, // Inserisci un valore iniziale per kg_produced
        kg_waste: 0, // Inserisci un valore iniziale per kg_waste
        timestamp: new Date() // Inserisci un valore iniziale per timestamp
    });*/

    //qua ho rimosso tutto perché non voglio che l'id lo metta l'utente

    @Input()
    initialState: BehaviorSubject<Production> = new BehaviorSubject({});

    @Output()
    formValuesChanged = new EventEmitter<Production>();

    @Output()
    formSubmitted = new EventEmitter<Production>();

    productionForm: FormGroup = new FormGroup({});

    constructor(private fb: FormBuilder) { }

    get kg_produced() { return this.productionForm.get('kg_produced')!; }
    get kg_waste() { return this.productionForm.get('kg_waste')!; }

    ngOnInit() {
        this.initialState.subscribe(production => {
            this.productionForm = this.fb.group({
                kg_produced: [ production.kg_produced, [ Validators.required ] ],
                kg_waste: [ production.kg_waste, [Validators.required] ]
            });
        });

        this.productionForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
    }

    submitForm() {
        this.formSubmitted.emit(this.productionForm.value);
    }
}