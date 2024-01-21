import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ingredients-component',
  template: `
    <div class="container less-padding">
      <h2 class="less-padding">Ingredienti</h2>
      <table class="table less-padding">
        <thead>
        <tr>
          <th>Nome</th>
          <th>Quantità disponibile (kg)</th>
        </tr>
        </thead>
        <tbody class="less-padding">
        <tr *ngFor="let ingredient of ingredients">
          <td>{{ ingredient.name }}</td>
          <td>{{ ingredient.quantity }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
  ]
})
export class IngredientsComponentComponent implements OnInit {

  ingredients: any[] = [];
  constructor() { }

  ngOnInit(): void {

    const acqua = { name: 'Acqua', quantity: 10800 };
    const farina = { name: 'Farina', quantity: 5000 };
    const zucchero = {name: 'Zucchero', quantity: 20500};
    this.ingredients.push(acqua, farina, zucchero);
  }

}
