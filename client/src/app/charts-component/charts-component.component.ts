import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProductivityService } from '../productivity.service';
import { Productivity } from '../productivity';
import { Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';


@Component({
  selector: 'app-charts-component',
  templateUrl: './app-charts-component.html',
  styleUrls: ['./app-charts-component.css']
})
export class ChartsComponentComponent implements OnInit {

  productivitys: Observable<Productivity[]> = new Observable();
  productivity!: Productivity;

  constructor(private productivityService: ProductivityService) { }

  private getProductivitys(): void {
    this.productivitys = this.productivityService.getProductivity();
  }

  public chart: any;


  ngOnInit(): void {

    /*productivityArray: Any[] = [];

    this.productivityService.getProductivity().pipe(
        toArray()
    ).subscribe({
      next: (productivity: Productivity[]) => console.log(productivity),
      error: (err: Error) => console.log("Errore, forse causa internet"),
      complete: () => console.log("Tutti le productivity ricevute")

    });

     */




    this.chart = new Chart("MyChart", {
          type: 'bar', //this denotes tha type of chart

          data: {// values on X-Axis
            labels: ['00:00 - 03:00', '03:00 - 06:00', '06:00 - 09:00','09:00 - 12:00',
    								 '12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00', '21:00 - 24:00'],
    	       datasets: [
              {
                label: "Waste",
                //label: this.productivityService.getProductivity(),
                data: ['90','120', '212', '79', '92',
    								 '174', '75', '56'],
                //data:this.productivityService.getProductivity(),
                backgroundColor: 'blue',
                borderWidth:1,
                hoverBorderWidth:3,
                hoverBorderColor:'red'
              },
              {
                label: "Product",
                data: ['890', '789', '675', '666', '347',
    									 '0.00', '245', '645'],
                backgroundColor: 'limegreen',
                borderWidth:1,
                hoverBorderWidth:3,
                hoverBorderColor:'black'
              }
            ]
          },
          options: {
            aspectRatio:2,
            /*title: {
              display:true,
              text: 'Weekly Productivity',
              fontSize: 20
            }*/
          }

        });

  }
}
