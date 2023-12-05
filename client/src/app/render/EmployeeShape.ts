import Konva from "konva";
import Shape = Konva.Shape;
import Stage = Konva.Stage;
import {SceneCanvas} from "konva/lib/Canvas";
import {Node} from "konva/lib/Node";
import Layer = Konva.Layer;

export class EmployeeShape extends Shape {
    private stage;
    private layer;
    constructor(stage: Stage, layer: Layer) {
        super();
        this.stage = stage;
        this.layer = layer;

        var circle = new Konva.Circle({
            stroke: 'black',
            x: this.stage.width() - 50,
            y: this.stage.height() - 200,
            radius: 50
        });
        circle.on('click', function(){
            console.log("over emplo");
        });
        
        var righteye = new Konva.Circle({
            stroke: 'black',
            x: this.stage.width() - 30,
            y: this.stage.height() - 220,
            radius: 10
        });
        var lefteye = new Konva.Circle({
            stroke: 'black',
            x: this.stage.width() - 70,
            y: this.stage.height() - 220,
            radius: 10
        });

        //Happy
        var arc = new Konva.Arc({
            x: this.stage.width() - 50,
            y: this.stage.height() - 210,
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
            x: this.stage.width() - 50,
            y: this.stage.height() - 150,
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