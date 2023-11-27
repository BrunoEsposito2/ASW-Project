import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmployeesListComponent} from "../employees-list/employees-list.component";
import {EmployeeRenderedComponent} from '../render/employee-rendered.component';
import {EmployeeService} from "../employee.service";
import {Employee} from "../employee";
import {Observable} from "rxjs";
import Konva from "konva";

@Component({
  selector: 'app-mixer-unit-component',
  template: `
    <div id="stage-parent">
        <div id="konva"></div>
    </div>
  `,
  styles: [
    `p {
      color:blue;
    }
    #stage-parent {
      width: 100%;
    }
    #stage-parent {
      background: url('../../assets/canvasBG.png');
      background-size: cover;
      border-style: solid;
    }
    `
  ]
})
export class MixerUnitComponentComponent implements OnInit, AfterViewInit {


  private ctx!: CanvasRenderingContext2D | null;
  employees$: Observable<Employee[]> = new Observable();

  constructor(private employeesService: EmployeeService) {}

  ngOnInit(): void {

    this.employees$ = this.employeesService.getEmployees();
    var sceneWidth = 1000;
    var sceneHeight = 500;

    var stage = new Konva.Stage({
      container: 'konva',
      // first just set set as is
      width: sceneWidth,
      height: sceneHeight,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    // add circle into center
    var circle = new Konva.Circle({
      radius: 50,
      fill: 'red',
      x: stage.width() / 2,
      y: stage.height() / 2,
    });
    layer.add(circle);

    // rectangle in bottom right of the stage
    var rect = new Konva.Rect({
      fill: 'green',
      x: stage.width() - 100,
      y: stage.height() - 100,
      width: 100,
      height: 100,
    });
    layer.add(rect);



    circle.on('mouseover', function(){
      console.log("over");
    });
// add the shape to the layer
    layer.add(circle);

// add the layer to the stage
    stage.add(layer);

// draw the image
    layer.draw();

    function fitStageIntoParentContainer() {
      var container = document.querySelector('#stage-parent');

      // now we need to fit stage into parent container
      var containerWidth = container!.clientWidth;

      // but we also make the full scene visible
      // so we need to scale all objects on canvas
      var scale = containerWidth / sceneWidth;

      stage.width(sceneWidth * scale);
      stage.height(sceneHeight * scale);
      stage.scale({ x: scale, y: scale });
    }
    fitStageIntoParentContainer();
    window.addEventListener('resize', fitStageIntoParentContainer);
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

