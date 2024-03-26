import * as SPLAT from "gsplat";
import { Controller } from "./editorLib/Controller";

const canvas = document.getElementById("canvas");
const progressDialog = document.getElementById("progress-dialog");
const progressIndicator = document.getElementById("progress-indicator");

const controller = new Controller(canvas);

async function main() {
    const url = controller.basepath + "splats/yona/yona_7000_edit.splat";
    const splat = await SPLAT.Loader.LoadAsync(url, controller.scene, (progress) => (progressIndicator.value = progress * 100));
    progressDialog.close();
    controller.renderer.backgroundColor = new SPLAT.Color32(0, 0, 0, 255);
    
    console.log("Number of splats: " + splat.data.vertexCount)
    
    splat.rotation = SPLAT.Quaternion.FromEuler(new SPLAT.Vector3(Math.PI/4, 0, 0));
    splat.applyRotation();
    
    const handleResize = () => {
        controller.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    const frame = () => {
        controller.update();
        
        requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
}

main();