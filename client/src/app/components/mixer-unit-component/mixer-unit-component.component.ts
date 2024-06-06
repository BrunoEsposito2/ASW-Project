import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../employee";
import {Observable} from "rxjs";
import Konva from "konva";
import {EmployeeShape} from "../render/EmployeeShape";
import {FakerEmployeeDataService} from "../../faker-employee-data";

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
      background: url('../../../assets/plant-layout-plan-design.png');
      background-size: cover;
      border-style: solid;
    }
    `
  ]
})
export class MixerUnitComponentComponent implements OnInit, AfterViewInit {

  employees$: Observable<Employee[]> = new Observable();
  employeesArray: Employee[] = new Array();
  constructor(private employeesService: EmployeeService, private fakeEmployeeService: FakerEmployeeDataService) {}

  ngOnInit(): void {
    this.employees$ = this.employeesService.getEmployees();
    this.employees$.subscribe(val => {
      for(let emp of val){
        this.employeesArray.push(emp);
      }
    });
  }

  ngAfterViewInit(): void {

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

    this.fakeEmployeeService.getDataObservable().subscribe(val => {
      layer.destroyChildren();
      let x = 100;
      let n = 0;
      console.log(this.employeesArray);
      for(let empData of val){
        if(n<2){
          console.log(empData);
          let emp = this.employeesArray.find(i => i._id == empData["id_employee"]);
          let emplo = new EmployeeShape(stage, layer, Number(empData["longitude"]), Number(empData["latitude"]), Number(empData["temperature"]), Number(empData["saturation"]), emp!);
          layer.add(emplo);
          n++;
          x+= 40;
        }
      }

    });

// add the layer to the stage
    stage.add(layer);
// draw the image
    layer.draw();
  }
}

