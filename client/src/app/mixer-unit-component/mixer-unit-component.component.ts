import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

import { EmployeeRenderedComponent } from '../render/employee-rendered.component';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-mixer-unit-component',
  template: `
    <canvas class="" #canvas width=1000 height=500></canvas>
    <button (click)="animate()">Play</button>
  `,
  styles: [
    `p {
      color:blue;
    }
    canvas {
      background: url('../../assets/canvasBG.png');
      background-size: cover;
      border-style: solid;
      width: 1000px;
      overflow: scroll;
    }
    `
  ]
})
export class MixerUnitComponentComponent implements OnInit {

  //Canvas is 1000*500 (as coordinates)
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  constructor(private employeesService: EmployeeService) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    //Map is drawn from background image
    this.animate();
    //TO-DO add listeners to machines
  }

  animate(): void {

    this.ctx!.fillStyle = 'red';

    this.employeesService.getEmployees().subscribe({
      next: (employee: Employee[]) => {
        employee.forEach(e =>{
          const eDrawn = new EmployeeRenderedComponent(this.ctx!);
          eDrawn.draw(Number.parseInt(<string>e.latitude), Number.parseInt(<string>e.longitude));
        })
      },
      error: (err: Error) => console.log("Errore, forse causa internet"),
      complete: () => console.log("Tutti gli employees ricevuti")
    });
  }
}
