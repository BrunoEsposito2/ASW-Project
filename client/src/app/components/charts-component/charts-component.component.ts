import { Component, OnInit } from '@angular/core';

import { Chart } from 'angular-highcharts';
import {ProductionService} from "../../services/production.service";
import {Production} from "../../production";
import {FakerProductionService} from "../../services/faker-production-service/faker.production.service";

@Component({
  selector: 'app-charts-component',
  templateUrl: './app-charts-component.html',
  styleUrls: ['./app-charts-component.css']
})
export class ChartsComponentComponent implements OnInit {
  constructor(private productionService: ProductionService, private fakerProduction: FakerProductionService) {
  }

  public chart: any;


  // Variabili per tracciare l'intervallo di tempo corrente
  private currentIndex = 0;
  private pageSize = 10;
  private sortedProductions = new Array<Production>();
  private init: boolean = true;
  ngOnInit(): void {
    if(this.init) {
      this.productionService.refreshProductions();
      /*this.productionService.productions$.subscribe((productions: Production[]) => {
        this.sortedProductions = productions.sort((a, b) => {
          const timestampA = a.timestamp ? new Date(a.timestamp) : new Date(0);
          const timestampB = b.timestamp ? new Date(b.timestamp) : new Date(0);

          return timestampB.getTime() - timestampA.getTime();
        });
        this.updateChart();
      });*/

      this.productionService.productions$.subscribe((productions: Production[]) => {
        this.sortedProductions = productions.slice(-10).reverse();
        this.updateChart();
      });

      this.init = false;
    }

    this.fakerProduction.getDataObservable().subscribe((newData) => {
      this.sortedProductions.unshift(newData);
      this.onDataChange();
    });
  }

  onDataChange() {
    this.updateChart();
  }

// Metodo per aggiornare il grafico con i nuovi dati
  updateChart(): void {
    // Distruzione del grafico esistente
    if (this.chart) {
      this.chart.destroy();
    }

    /*const productions = this.sortedProductions.slice(this.currentIndex, this.currentIndex + this.pageSize);
    console.log(JSON.stringify(productions) + "Sliced");*/
    const productions = this.sortedProductions;

    const labels = productions.map(production => {
      return production.timestamp
          ? new Intl.DateTimeFormat('it-IT', {
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(new Date(production.timestamp))
          : '';
    });

    const wasteData = productions.map(production => production.kg_waste || 0);
    const productData = productions.map(production => production.kg_produced || 0);

    // Creazione del nuovo grafico
    this.chart = new Chart({
      chart: {
        type: 'line',
        height: 325
      },
      title: {
        text: 'Month wise production and waste'
      },
      xAxis: {
        categories: labels
      },
      yAxis: {
        title: {
          text: 'amount'
        }
      },
      series: [
        {
          name: "Waste",
          type: "line",
          color: '#044342',
          data: wasteData
        },
        {
          name: 'Product',
          type: 'line',
          color: '#ed9e20',
          data: productData
        },
      ],
      credits: {
        enabled: false
      }
    })
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