import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-rendered',
  template: `
  `,
  styles: [
  ]
})
export class EmployeeRenderedComponent extends Path2D implements OnInit {

  private ctx
  constructor(private context: CanvasRenderingContext2D) {
    super();
    this.ctx = context;
  }

   draw(x: number, y: number) {

     this.ctx.lineWidth = 3;

     //Square
     this.ctx.strokeRect(x - 25, y - 25, 50, 80);
     this.ctx.stroke();

     //Name
     this.ctx.font = '18px Sans Serif';
     this.ctx.fillText('Tizio 1', x - 20, y + 50, 40)
     //Head
     this.ctx.beginPath();
     this.ctx.arc(x, y, 20, 0, 2* Math.PI, false);
     this.ctx.closePath();
     this.ctx.stroke();

     //Left eye
     this.ctx.beginPath();
     this.ctx.arc(x - 7, y - 5, 3, 0, 2* Math.PI, false);
     this.ctx.closePath();
     this.ctx.stroke();
     //Right eye
     this.ctx.beginPath();
     this.ctx.arc(x + 7, y - 5, 3, 0, 2* Math.PI, false);
     this.ctx.closePath();
     this.ctx.stroke();

     //// TODO: Change according to health status
     //Smile
     this.ctx.beginPath();
     this.ctx.arc(x, y + 5, 10, 0,  Math.PI, false);
     this.ctx.closePath();
     this.ctx.stroke();
     // this.ctx.fillStyle = 'green';
     // this.ctx.fill();

     //this.ctx.strokeStyle = '#003300';

     //this.ctx.fillRect(x, y, z, z);

   }

   move(y: number, z: number) {
    const max = this.ctx.canvas.width / z;
    const canvas = this.ctx.canvas;
    let x = 0;
    const i = setInterval(() => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.draw(x, y);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 200);
  }

  ngOnInit(): void {
  }

}
