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
    private sat;
    private employee

    constructor(stage: Stage, layer: Layer, long: number, lat: number, temp: number, sat: number, employee: Employee ) {
        super();
        this.stage = stage;
        this.layer = layer;
        this.lat = lat;
        this.long = long;
        this.temp = temp;
        this.sat = sat;
        this.employee = employee;

        var tempAlarm = temp < 37;
        var satAlarm = sat > 95;

        var circle = new Konva.Circle({
            stroke: 'black',
            x: long,
            y: lat,
            radius: 50
        });

        //Info square
        var infopos = (lat < 300) ? 50 : - 200;
        var infogroup = new Konva.Group({
            x: long - 50,
            y: lat + infopos,
            rotation: 0
        });
        infogroup.hide();
        var square = new Konva.Rect({
            stroke: 'black',
            fill: 'white',
            x: 0,
            y: 0,
            width: 150,
            height: 150,
        });
        infogroup.add(square);

        var text = new Konva.Text({
            x: 0,
            y: 0,
            text: employee.name?.toString(),
            fontSize: 45,
            fontFamily: 'Calibri',
            fill: (tempAlarm) ? 'green' : 'red',
        });
        infogroup.add(text);

        var tempImage = new Image();
        tempImage.onload = function(){
            var tempIcon = new Konva.Image({
                x: -10,
                y: 40,
                width: 60,
                height: 60,
                image: tempImage,
            });
            infogroup.add(tempIcon);
        }
        tempImage.src = "../../assets/icons8-temperature-64.png";

        var tempText = new Konva.Text({
            x: 40,
            y: 40,
            text: temp.toString() + " °",
            fontSize: 35,
            fontFamily: 'Calibri',
            fill: (tempAlarm) ? 'green' : 'red',
        });
        infogroup.add(tempText);

        var satText = new Konva.Text({
            x: 40,
            y: 100,
            text: sat.toString() + " %",
            fontSize: 35,
            fontFamily: 'Calibri',
            fill: (satAlarm) ? 'green' : 'red',
        });
        infogroup.add(satText);

        var satImage = new Image();
        satImage.onload = function(){
            var satIcon = new Konva.Image({
                x: 0,
                y: 100,
                width: 50,
                height: 50,
                image: satImage,
            });
            infogroup.add(satIcon);
        }
        tempImage.src = "../../assets/icons8-temperature-64.png";
        satImage.src = "../../assets/icons8-saturation-96.png";

        layer.add(infogroup);

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