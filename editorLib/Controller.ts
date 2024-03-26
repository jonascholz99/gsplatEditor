import * as SPLAT from "gsplat";
import { ModeController } from "./ModeController";
import { DefaultMode } from "./DefaultMode";
import { SelectMode } from "./SelectMode"

import { AxisProgram } from "../libs/programs/AxisProgram";
import { GridProgram } from "../libs/programs/GridProgram";
import { KeyboardManager } from "../libs/KeyboardManager";
import { MouseManager } from "../libs/MouseManager";
import { Controls } from "../libs/Controls";

class Controller
{
    private _scene: SPLAT.Scene;
    private _camera: SPLAT.Camera;
    private _renderer: SPLAT.WebGLRenderer;
    private _orbitControls: SPLAT.OrbitControls;
    private _basepath: string;

    private _keyboardManager: KeyboardManager;
    private _mouseManager: MouseManager;
    private _intersectionTester: SPLAT.IntersectionTester;
    
    constructor(canvas: HTMLCanvasElement) 
    {
        this._scene = new SPLAT.Scene();
        this._camera = new SPLAT.Camera();
        this._camera.data.setSize(canvas.clientWidth, canvas.clientHeight);

        this._renderer = new SPLAT.WebGLRenderer(canvas);
        this._renderer.addProgram(new AxisProgram(this._renderer, []));
        this._renderer.addProgram(new GridProgram(this._renderer, []));
        this._orbitControls = new SPLAT.OrbitControls(this._camera, canvas);
        this._intersectionTester = new SPLAT.IntersectionTester(this._renderer.renderProgram);
        
        this._basepath = window.location.hostname === "localhost" ? "./gsplatEditor/public/" : "./";

        this._keyboardManager = new KeyboardManager();
        this._mouseManager = new MouseManager(canvas);
        new Controls([this._keyboardManager, this._mouseManager], canvas);

        ModeController.registerMode("default", () => new DefaultMode(this));
        ModeController.registerMode("select", () => new SelectMode(this));
        ModeController.enterMode("default");
    }

    setModusText(text)
    {
        document.getElementById('modusLabel').innerText = text;
    }
    
    update() {
        this._orbitControls.update();
        this._renderer.render(this._scene, this._camera);
    }
    
    get renderer(): SPLAT.WebGLRenderer 
    {
        return this._renderer;
    }
    
    get scene(): SPLAT.Scene 
    {
        return this._scene;
    }
    
    get basepath(): string
    {
        return this._basepath;    
    }
    
    get orbitControls(): SPLAT.OrbitControls 
    {
        return this._orbitControls;
    }
    
    get mouseManager(): MouseManager
    {
        return this._mouseManager;
    }
    
    get keyboardManager(): KeyboardManager
    {
        return this._keyboardManager;
    }
    
    get intersectionTester(): SPLAT.IntersectionTester
    {
        return this._intersectionTester
    }
}

export { Controller };