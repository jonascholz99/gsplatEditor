import * as SPLAT from "gsplat";
import { Controller } from "./Controller";
import { Mode } from "./Mode";
import { ModeController } from "./ModeController";

class DefaultMode implements Mode {
    exit: () => void;

    constructor(controller: Controller) {
        
        const handleEnterSelectMode = () => {
            ModeController.enterMode("select");
        };
        
        controller.keyboardManager.registerKey("h", handleEnterSelectMode);
        controller.orbitControls.enabled = true;
        controller.setModusText("Default");

        this.exit = () => {
            controller.keyboardManager.unregisterKey("h");
            controller.orbitControls.enabled = false;
        };
    }
}

export { DefaultMode };
