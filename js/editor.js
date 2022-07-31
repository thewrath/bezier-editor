import { GameObject, Vector, TextField } from 'black-engine';
import { Bezier } from './Bezier';
import { ControlPoint } from './ControlPoint';
import { Rectangle } from './Rectangle';
import { AutoCopyTextField } from './AutoCopyTextField';

export class Editor extends GameObject {
  constructor() {
    super();
    this.bezier = new Bezier([], 0.05);
    this.pathObjects = [];
    this.touchable = true;
  }

  onAdded() {
    super.onAdded();

    this.title = new TextField('Bezier editor', 'Arial', 0xf6a200, 40);
    this.title.align = 'center';
    this.title.x = this.stage.centerX;
    this.title.y = this.stage.centerY;
    this.title.alignPivot();
    this.addChild(this.title);

    this.configuration = new AutoCopyTextField('[]', 'Arial', 0xf6a200, 16);
    this.configuration.align = 'center';
    this.configuration.x = this.stage.centerX;
    this.configuration.y = this.stage.centerY + 50;
    this.configuration.alignAnchor();
    this.configuration.touchable = true;
    this.addChild(this.configuration);

    this.controlPoints = [
      new Vector(150, 100),
      new Vector(350, -50),
      new Vector(500, 100),
      new Vector(650, -50),
    ].map((p, i) => {
      const controlPoint = new ControlPoint(p.x, p.y, i);
      controlPoint.on('released', () => {
        this.__buildPathObjects();
        this.__refreshConfigurationDisplay();
      }, this);
      this.addChild(controlPoint);
      return controlPoint;
    });

    this.__buildPathObjects();
    this.__refreshConfigurationDisplay();
  }

  /**
   * Turn the Bezier curve into DisplayObject (Rectangle) and add it to current DisplayObject. 
   */
  __buildPathObjects() {
    this.pathObjects.forEach(o => {
      this.removeChild(o);
    });
    this.pathObjects = [];
    
    this.bezier.controlPoints = this.controlPoints.map(c => c.toVector())
    this.bezier.refresh();
    this.bezier.path.forEach(p => {
      const object = new Rectangle(p.x, p.y, 5, 5);
      object.color = 0xf6a200;
      this.pathObjects.push(object);
      this.addChild(object);
    });
  }

  __refreshConfigurationDisplay() {
    if (this.configuration instanceof TextField) {
      this.configuration.text = this.controlPoints.reduce((previous, current) => {
        return previous + ` new Vector(${current.x.toFixed(2)}, ${current.y.toFixed(2)}),`;
      }, '[') + ']';
    }
  }
}