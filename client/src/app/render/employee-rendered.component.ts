import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-rendered',
  template: `
    <p>
      employee-rendered works!
    </p>
  `,
  styles: [
  ]
})
export class EmployeeRenderedComponent implements OnInit {
  constructor(private ctx: CanvasRenderingContext2D) {}

   draw(x: number, y: number, z: number) {
     this.ctx.fillRect(z * x, z * y, z, z);
   }

  ngOnInit(): void {
  }

}
