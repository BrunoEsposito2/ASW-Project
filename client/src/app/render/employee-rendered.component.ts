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
     this.ctx.fillRect(x, y, z, z);
   }

   move(y: number, z: number) {
    const max = this.ctx.canvas.width / z;
    const canvas = this.ctx.canvas;
    let x = 0;
    const i = setInterval(() => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.draw(x, y, z);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 200);
  }

  ngOnInit(): void {
  }

}
