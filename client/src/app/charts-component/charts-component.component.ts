import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import {ProductionService} from "../production.service";
import {Production} from "../production";
@Component({
  selector: 'app-charts-component',
  templateUrl: './app-charts-component.html',
  styleUrls: ['./app-charts-component.css']
})
export class ChartsComponentComponent implements OnInit {
  constructor(private productionService: ProductionService) {
  }

  public chart: any;


  // Variabili per tracciare l'intervallo di tempo corrente
  private currentIndex = 0;
  private pageSize = 40;
  private sortedProductions = new Array<Production>();

  ngOnInit(): void {
    this.productionService.refreshProductions();
    this.productionService.productions$.subscribe((productions: Production[]) => {
      this.sortedProductions = productions.sort((a, b) => {
        const timestampA = a.timestamp ? new Date(a.timestamp) : new Date(0);
        const timestampB = b.timestamp ? new Date(b.timestamp) : new Date(0);

        return timestampB.getTime() - timestampA.getTime();
      });
      this.updateChart();
    });
  }






  onDataChange() {
    this.updateChart();
  }


// Metodo per aggiornare il grafico con i nuovi dati
  updateChart(): void {
    const productions = this.sortedProductions.slice(this.currentIndex, this.currentIndex + this.pageSize);
    console.log(productions);
    const labels = productions.map(production => production.timestamp ? new Date(production.timestamp).toLocaleString() : '');
    const wasteData = productions.map(production => production.kg_waste || 0);
    const productData = productions.map(production => production.kg_produced || 0);


    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: "Waste",
            data: wasteData,
            backgroundColor: 'blue',
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: 'red'
          },
          {
            label: "Product",
            data: productData,
            backgroundColor: 'limegreen',
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: 'black'
          }
        ]
      },
      options: {
        aspectRatio: 2,
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

// Metodi per scorrere avanti e indietro nel tempo
  nextPage(): void {
    this.currentIndex += this.pageSize;
    this.updateChart();
  }

  previousPage(): void {
    this.currentIndex = Math.max(this.currentIndex - this.pageSize, 0);
    this.updateChart();
  }
}