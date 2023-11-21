import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {EmployeeRenderedComponent} from '../render/employee-rendered.component';

@Component({
  selector: 'app-mixer-unit-component',
  template: `
    <canvas class="" #canvas ></canvas>
    
  `,
  styles: [
    `p {
      color:blue;
    }
    canvas {
      border-style: solid;
      width: 1000px;
    }
    `
  ]
})
export class MixerUnitComponentComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngAfterViewInit(): void {

    const employee = new EmployeeRenderedComponent(this.ctx!);
    this.ctx!.fillStyle = 'red';
    //const square = new Square(this.ctx);
    //this.ctx!.fillRect(5, 1, 20, 20);
    employee.draw(10, 10);
    employee.move(1,50)
  }


}
