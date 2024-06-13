import Konva from "konva";
import Shape = Konva.Shape;
import Stage = Konva.Stage;
import Layer = Konva.Layer;
import {Employee} from "../../employee";

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

        var scaleFactor = 0.33;  // Scala di un terzo
        var padding = 50; // Distanza minima dal bordo

        var tempAlarm = temp > 37;
        var satAlarm = sat < 95;

        // Controlla e aggiusta le coordinate per evitare che cadano fuori dal canvas
        var canvasWidth = stage.width();
        var canvasHeight = stage.height();

        // Limita le coordinate del cerchio per essere visibili con un margine di sicurezza
        long = Math.max(padding, Math.min(canvasWidth - padding, long));
        lat = Math.max(padding, Math.min(canvasHeight - padding, lat));

        var circle = new Konva.Circle({
            stroke: 'black',
            fill: 'white',
            x: long,
            y: lat,
            z: -1,
            radius: 50 * scaleFactor
        });

        // Info square
        var infopos = (lat < canvasHeight / 2) ? 50 * scaleFactor : -200 * scaleFactor;
        var infogroupX = long - (50 * scaleFactor);
        var infogroupY = lat + infopos;

        // Limita le coordinate del gruppo delle info per essere visibili con un margine di sicurezza
        infogroupX = Math.max(padding, Math.min(canvasWidth - 150 * scaleFactor - padding, infogroupX));
        infogroupY = Math.max(padding, Math.min(canvasHeight - 150 * scaleFactor - padding, infogroupY));

        var infogroup = new Konva.Group({
            x: infogroupX,
            y: infogroupY,
            rotation: 0,
            scaleX: scaleFactor,
            scaleY: scaleFactor
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
            fill: (tempAlarm || satAlarm) ? 'red' : 'green',
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
            y: 50,
            text: temp.toFixed(2).toString() + "°",
            fontSize: 32,
            fontFamily: 'Calibri',
            fill: (tempAlarm) ? 'red' : 'green',
        });
        infogroup.add(tempText);

        var satText = new Konva.Text({
            x: 50,
            y: 110,
            text: sat.toFixed(2).toString() + "%",
            fontSize: 32,
            fontFamily: 'Calibri',
            fill: (satAlarm) ? 'red' : 'green',
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

        circle.on('mouseover', function(){
            infogroup.show();
        });

        circle.on('mouseout', function(){
            infogroup.hide();
        });

        circle.on('click', function(){
            infogroup.isVisible() ?
                infogroup.hide() :
                infogroup.show();
            layer.add(infogroup);
            layer.draw();
        });

        var righteye = new Konva.Circle({
            stroke: 'black',
            x: long + (20 * scaleFactor),
            y: lat - (10 * scaleFactor),
            radius: 10 * scaleFactor
        });
        var lefteye = new Konva.Circle({
            stroke: 'black',
            x: long - (20 * scaleFactor),
            y: lat - (10 * scaleFactor),
            radius: 10 * scaleFactor
        });

        var arc;
        if(!tempAlarm && !satAlarm) {
            // Happy
            arc = new Konva.Arc({
                x: long,
                y: lat - (10 * scaleFactor),
                innerRadius: 30 * scaleFactor,
                outerRadius: 40 * scaleFactor,
                angle: 90,
                fill: 'green',
                stroke: 'black',
                strokeWidth: 4 * scaleFactor,
                rotation: 45
            });
        } else {
            // Sad
            arc = new Konva.Arc({
                x: long,
                y: lat + (60 * scaleFactor),
                innerRadius: 30 * scaleFactor,
                outerRadius: 40 * scaleFactor,
                angle: 90,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4 * scaleFactor,
                rotation: 225
            });
        }

        this.layer.add(circle);
        this.layer.add(arc);
        this.layer.add(lefteye);
        this.layer.add(righteye);
    }


}