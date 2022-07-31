'use strict';

import { Graphics } from 'black-engine';

/**
 * Display a Rectangle using Graphics.
 */
export class Rectangle extends Graphics {
    
  /**
   * @param {Number} x 
   * @param {Number} y 
   * @param {Number} w 
   * @param {Number} h 
   */
    constructor(x, y, w, h) {
      super();
      
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = 0xffffff;
    }
  
    onAdded() {
      this.beginPath();
      this.fillStyle(this.color);
      this.rect(0, 0, this.w, this.h);
      this.fill();
      this.closePath();
    }
  }