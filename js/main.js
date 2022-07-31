import { CanvasDriver, Input, Engine, StageScaleMode } from "black-engine";
import { Editor } from "./editor";

// Game will be our starting class and rendering will be done on Canvas
const engine = new Engine('container', Editor, CanvasDriver, [Input]);

// Pause simulation when container loses focus
engine.pauseOnBlur = false;

// Pause simulation when page is getting hidden
engine.pauseOnHide = false;

// Wroom, wroom!
engine.start();

// Set default stage size
engine.stage.setSize(800, 600);

// Makes stage always centered
engine.stage.scaleMode = StageScaleMode.LETTERBOX;

