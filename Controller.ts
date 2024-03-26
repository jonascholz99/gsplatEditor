import * as SPLAT from 'gsplat';
import { AxisProgram } from "./libs/programs/AxisProgram";
import { GridProgram } from "./libs/programs/GridProgram";

class Controller
{
    private _scene: SPLAT.Scene;
    private _camera: SPLAT.Camera;
    private _renderer: SPLAT.WebGLRenderer;
    private _orbitControls: SPLAT.OrbitControls;
    
    constructor(canvas: HTMLCanvasElement) 
    {
        this._scene = new SPLAT.Scene();
        this._camera = new SPLAT.Camera();
        this._camera.data.setSize(canvas.clientWidth, canvas.clientHeight);

        this._renderer = new SPLAT.WebGLRenderer(canvas);
        this._renderer.addProgram(new AxisProgram(this._renderer, []));
        this._renderer.addProgram(new GridProgram(this._renderer, []));
        this._orbitControls = new SPLAT.OrbitControls(this._camera, canvas);
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

    get orbitControls(): SPLAT.OrbitControls 
    {
        return this._orbitControls;
    }
}

export { Controller };