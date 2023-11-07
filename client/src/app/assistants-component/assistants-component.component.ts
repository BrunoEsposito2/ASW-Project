import {Component, OnInit} from '@angular/core';
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-assistants-component',
  template: `
    <div class="row">
      <div class="col-md-6">
        <div class="card bg-light">
          <img src="https://thumbs.dreamstime.com/b/passport-picture-cool-guy-blue-shirt-isolated-white-background-cut-out-55127029.jpg" style="width:100px; height:130px" class="card-img-top mx-auto d-block" alt="Foto Operatore 1">
          <div class="card-body">
            <h5 class="card-title custom-font">Operatore 1</h5>
            <p class="card-text">Informazioni sull'Operatore 1</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card bg-light">
          <img src="https://thumbs.dreamstime.com/b/jeune-homme-amical-36669104.jpg" style="width:100px; height:130px" class="card-img-top mx-auto d-block" alt="Foto Operatore 2">
          <div class="card-body">
            <h5 class="card-title custom-font">Operatore 2</h5>
            <p class="card-text">Informazioni sull'Operatore 2</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AssistantsComponentComponent implements OnInit {

  constructor(private employeesService: EmployeeService) { }

  private employees: Employee[] = [];

  ngOnInit(): void {
    this.employeesService.getEmployees().subscribe(
        (data) => {
          this.employees = data;
        },
        (error) => {
          console.error('Errore durante il recupero dei dati degli operatori:', error);
        }
    );


  }

  private getRandomOperators(): Employee[] {
    if (this.employees.length < 2) {
      throw new Error('Non ci sono abbastanza operatori nel database.');
    }

    const randomIndexes = this.getRandomIndexes(this.employees.length, 2); // Genera due indici casuali
    const randomOperators = [this.employees[randomIndexes[0]], this.employees[randomIndexes[1]]];

    return randomOperators;
  }

  private getRandomIndexes(max: number, count: number): number[] {
    const randomIndexes: number[] = [];
    while (randomIndexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    return randomIndexes;
  }
}
