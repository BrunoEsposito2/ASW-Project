import Konva from "konva";
import Shape = Konva.Shape;
import Stage = Konva.Stage;
import Layer = Konva.Layer;
import {Employee} from "../employee";

export class EmployeeShape extends Shape {
    private stage;
    private layer;
    private lat;
    private long;
    private temp;
    private employee

    constructor(stage: Stage, layer: Layer, long: number, lat: number, temp: number, employee: Employee ) {
        super();
        this.stage = stage;
        this.layer = layer;
        this.lat = lat;
        this.long = long;
        this.temp = temp;
        this.employee = employee;

        var tempAlarm = temp < 37;

        var circle = new Konva.Circle({
            stroke: 'black',
            x: long,
            y: lat,
            radius: 50
        });

        //Info square
        var infopos = (lat < 350) ? 50 : - 150;
        var infogroup = new Konva.Group({
            x: long - 50,
            y: lat + infopos,
            rotation: 0
        });
        var text = new Konva.Text({
            x: 0,
            y: 70,
            text: employee.name?.toString(),
            fontSize: 30,
            fontFamily: 'Calibri',
            fill: (tempAlarm) ? 'green' : 'red',
        });
        infogroup.add(text);
        layer.add(infogroup);

        var square = new Konva.Rect({
            stroke: 'black',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
        });
        infogroup.add(square);
        infogroup.hide();

        circle.on('click', function(){
            infogroup.isVisible() ?
                infogroup.hide() :
                infogroup.show();
            layer.add(infogroup);
            layer.draw();
        });

        var righteye = new Konva.Circle({
            stroke: 'black',
            x: long + 20,
            y: lat - 10,
            radius: 10
        });
        var lefteye = new Konva.Circle({
            stroke: 'black',
            x: long - 20,
            y: lat - 10,
            radius: 10
        });

        if(tempAlarm)
            //Happy
            var arc = new Konva.Arc({
                x: long,
                y: lat - 10,
                innerRadius: 30,
                outerRadius: 40,
                angle: 90,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4,
                rotation: 45
            });
        else
            //Sad
            var arc = new Konva.Arc({
                x: long,
                y: lat + 60,
                innerRadius: 30,
                outerRadius: 40,
                angle: 90,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4,
                rotation: 225
            });
        this.layer.add(arc);
        this.layer.add(lefteye);
        this.layer.add(righteye);
        this.layer.add(circle);
    }
    
}