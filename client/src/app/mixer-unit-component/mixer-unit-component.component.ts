import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmployeesListComponent} from "../employees-list/employees-list.component";
import {EmployeeRenderedComponent} from '../render/employee-rendered.component';
import {EmployeeService} from "../employee.service";
import {Employee} from "../employee";
import {Observable} from "rxjs";

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
      background: url('../../assets/canvasBG.png');
      background-size: cover;
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
  employees$: Observable<Employee[]> = new Observable();
  constructor(private employeesService: EmployeeService) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.employees$ = this.employeesService.getEmployees();

  }

  ngAfterViewInit(): void {
    this.employees$.subscribe(val => {
      let x = 10;
      for(let emp of val){
        let employee = new EmployeeRenderedComponent(this.ctx!);
        this.ctx!.fillStyle = 'red';
        //const square = new Square(this.ctx);
        //this.ctx!.fillRect(5, 1, 20, 20);
        employee.draw(x, 10, emp.name!);
        console.log(emp);
        x+=40;
      }
    });


  }
}
