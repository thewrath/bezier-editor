'use strict';

import { Line, Vector } from 'black-engine';

/**
 * Classe to build Bezier curve based on list of control points.
 */
export class Bezier {

    /**
     * @param {Array} controlPoints list of Vector.
     * @param {Number} step 
     */
    constructor(controlPoints, step=0.1) {
        this.controlPoints = controlPoints;
        this.step = step;
        this.path = this.__compute(step);
    }

    /**
     * Refresh curve, 
     */
    refresh() {
        this.path = this.__compute(this.step);
    }
    
    /**
     * Compute bezier curve (list of Vector) based on list of control points.
     * 
     * @param {Number} step 
     * @returns 
     */
    __compute(step) {
        const computeLines = (points, t, intersectPoints = []) => {
            const lines = _map2(points, (f, s) => new Line(f, s));
            const newIntersectPoints = lines.map(l => this.__pointOnLine(l, t));
        
            if (newIntersectPoints.length >= 2) {
                return computeLines(newIntersectPoints, t, newIntersectPoints);
            }
        
            return newIntersectPoints;
        }
    
        let result = [];
        for (let t = 0; t < 1; t +=step) {
            result = result.concat(computeLines(this.controlPoints, t, []));
        }
    
        return result;
    }
  
    /**
     * Gives you the coordinates of the point at a certain percentage of the line length.
     * 
     * @param {Line} line 
     * @param {Number} percent 
     * @returns 
     */
    __pointOnLine(line, percent) {
        const {start, end} = line;
        const a = new Vector();
        const b = new Vector();
        start.copyTo(a);
        end.copyTo(b);
    
        b.subtract(start).normalize();
    
        return a.add(b.multiplyScalar(percent*line.length()));
    }
}

/**
 * Helper function to map over an array two by two.
 * 
 * @param {Array} array 
 * @param {Function} cb 
 * @returns 
 */
const _map2 = (array, cb) => {
    const result = [];
    for (let i = 0; i < array.length - 1; i++) {
        result.push(cb(array[i], array[i+1], i));
    }
    return result;
}