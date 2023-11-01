import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {EmployeeRenderedComponent} from '../render/employee-rendered.component';

@Component({
  selector: 'app-mixer-unit-component',
  template: `
    <canvas class="" #canvas ></canvas>
    <button (click)="animate()">Play</button>
  `,
  styles: [
    `p {
      color:blue;
    }
    canvas {
      border-style: solid;
      width: 250px;
    }
    `
  ]
})
export class MixerUnitComponentComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  animate(): void {
    const employee = new EmployeeRenderedComponent(this.ctx!);
    this.ctx!.fillStyle = 'red';
  //const square = new Square(this.ctx);
  //this.ctx!.fillRect(5, 1, 20, 20);
  employee.draw(1, 1);
  }

}
