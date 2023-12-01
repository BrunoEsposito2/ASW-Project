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
        var rect = new Konva.Rect({
            fill: 'blue',
            x: this.stage.width() - 100,
            y: this.stage.height() - 250,
            width: 100,
            height: 100,
        });
        rect.on('mouseover', function(){
            console.log("over emplo");
        });
        this.layer.add(rect);
    }
    
}