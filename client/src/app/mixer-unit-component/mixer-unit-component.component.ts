import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EmployeeRenderedComponent } from '../render/employee-rendered.component';

@Component({
  selector: 'app-mixer-unit-component',
  template: `
    <canvas class="" #canvas width=300 height=150></canvas>
    <button (click)="animate()">Play</button>
  `,
  styles: [
    `p {
      color:blue;
    }
    canvas {
      background: url('https://www.rainews.it/cropgd/806x460/dl/img/2022/05/29/1653823199609_amajesticoilpaintingofaraccoonqueen.jpg');
      border-style: solid;
      width: 1000px;
      overflow: scroll;
    }
    `
  ]
})
export class MixerUnitComponentComponent implements OnInit {

  //Canvas is 300*150 (as coordinates)
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    //Map is drawn from background image

    //TO-DO add listeners to machines
  }

  animate(): void {

    const employee = new EmployeeRenderedComponent(this.ctx!);
    this.ctx!.fillStyle = 'red';

    employee.draw(290, 140, 10);
    employee.move(10, 10);
  }

}
