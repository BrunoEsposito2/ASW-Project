import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { EmployeeRenderedComponent } from '../render/employee-rendered.component';

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

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    //Map is drawn from background image

    //TO-DO add listeners to machines
  }

  animate(): void {

    const employee = new EmployeeRenderedComponent(this.ctx!);
    this.ctx!.fillStyle = 'red';

    employee.draw(330, 140, 10);
  //  employee.move(10, 10);
  }

}
