import Konva from "konva";
import Shape = Konva.Shape;
import Stage = Konva.Stage;
import Layer = Konva.Layer;

export class EmployeeShape extends Shape {
    private stage;
    private layer;
    private lat;
    private long;
    constructor(stage: Stage, layer: Layer, long: number, lat: number ) {
        super();
        this.stage = stage;
        this.layer = layer;
        this.lat = lat;
        this.long = long;

        var circle = new Konva.Circle({
            stroke: 'black',
            x: long,
            y: lat,
            radius: 50
        });
        var square = new Konva.Rect({
            stroke: 'black',
            x: long - 50,
            y: lat + 50,
            width: 100,
            height: 100,
        });
        square.hide();

        circle.on('click', function(){
            square.isVisible() ?
                square.hide() :
                square.show();
            layer.add(square);
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

        //Happy
        var arc = new Konva.Arc({
            x: long,
            y: lat - 20,
            innerRadius: 30,
            outerRadius: 40,
            angle: 90,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            rotation: 45
        });

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