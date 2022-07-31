'use strict';

import { Rectangle } from "./Rectangle";
import { DragComponent } from "./DragComponent";
import { DisplayObject, Vector, TextField, BlendMode } from "black-engine";

/**
 * Display a draggable control point.
 */
export class ControlPoint extends Rectangle {

    /**
     * @param {Number} x 
     * @param {Number} y 
     * @param {String} position position of the control points in control points list.
     */
    constructor(x, y, position) {
        super(x, y, 15, 15);
        this.color = 0xff0000;
        this.position = position;
        this.addComponent(new DragComponent());
        this.alignPivot();
    }

    onAdded() {
        super.onAdded();       
        const text = this.addChild(new TextField(this.position.toString(), 'Arial', 0xf6a200, 20));
        text.alignPivot();
        text.y = -10;
        text.x = 8;
    }

    /**
     * @returns the vector representation of the control points (position)
     */
    toVector() {
        return new Vector(this.x, this.y);
    }
}