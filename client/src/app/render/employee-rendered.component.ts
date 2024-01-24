import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-employee-rendered',
  template: `
  `,
  styles: [
  ]
})
export class EmployeeRenderedComponent extends Path2D implements OnInit {

  private ctx;
  constructor(private context: CanvasRenderingContext2D) {
    super();
    this.ctx = context;
  }

  draw(x: number, y: number, name: string) {


     this.ctx.lineWidth = 2;

     //Name
     this.ctx.font = '12px Sans Serif';
     this.ctx.fillText(name, x - 20, y + 25, 40)
     //Head
     this.ctx.beginPath();
     this.ctx.arc(x, y, 10, 0, 2* Math.PI, false);
     this.ctx.closePath();
     this.ctx.stroke();

     //Left eye
     this.ctx.beginPath();
     this.ctx.arc(x - 3, y - 2, 1, 0, 2* Math.PI, false);
     this.ctx.closePath();
     this.ctx.stroke();
     //Right eye
     this.ctx.beginPath();
     this.ctx.arc(x + 3, y - 2, 1, 0, 2* Math.PI, false);
     this.ctx.closePath();
     this.ctx.stroke();

     //// TODO: Change according to health status
     //Smile
     this.ctx.beginPath();
     this.ctx.arc(x, y + 3, 3, 0,  Math.PI, false);
     this.ctx.closePath();
     this.ctx.stroke();
     // this.ctx.fillStyle = 'green';
     // this.ctx.fill();

     //this.ctx.strokeStyle = '#003300';

     //this.ctx.fillRect(x, y, z, z);

   }

   move(x: number, y: number) {
    const max = this.ctx.canvas.width / x;
    const canvas = this.ctx.canvas;
    const i = setInterval(() => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      //this.draw(x, y);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 200);
  }

  ngOnInit(): void {
  }

}
