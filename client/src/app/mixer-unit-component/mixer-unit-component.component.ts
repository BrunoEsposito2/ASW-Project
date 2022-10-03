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

    //Draw industry map
    this.ctx!.fillStyle = 'black';

    this.ctx!.strokeRect(20, 10, 60, 60);
    this.ctx!.fillText("Macchina 1", 24, 40);
    this.ctx!.strokeRect(120, 10, 60, 60);
    this.ctx!.fillText("Macchina 2", 124, 40);
    this.ctx!.strokeRect(220, 10, 60, 60);
    this.ctx!.fillText("Macchina 3", 224, 40);

    //TO-DO add listeners to machines
  }

  animate(): void {

    const employee = new EmployeeRenderedComponent(this.ctx!);
    this.ctx!.fillStyle = 'red';

    employee.draw(290, 140, 10);
    employee.move(10, 10);
  }

}
