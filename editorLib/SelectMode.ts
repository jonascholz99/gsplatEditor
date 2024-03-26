import * as SPLAT from "gsplat";
import { Controller } from "./Controller";
import { Mode } from "./Mode";
import { ModeController } from "./ModeController";

import { SelectionManager } from "../libs/SelectionManager";

class SelectMode implements Mode {
    exit: () => void;

    constructor(controller: Controller) {

        const handleEnterDefaultMode = () => {
            ModeController.enterMode("default");
        };

        const handleClearSelection = (event: KeyboardEvent) => {
            if (event.altKey) {
                SelectionManager.selectedSplat = null;
            }
        };

        let mouseDownPosition: SPLAT.Vector3 = new SPLAT.Vector3();
        const handleMouseDown = () => {
            mouseDownPosition = controller.mouseManager.currentMousePosition;
        };

        const handleMouseUp = () => {
            const mousePosition = controller.mouseManager.currentMousePosition;
            const distance = mousePosition.distanceTo(mouseDownPosition);
            if (distance > 0.01) return;
            const result = controller.intersectionTester.testPoint(mousePosition.x, mousePosition.y);
            if (result !== null) {
                SelectionManager.selectedSplat = result;
            } else {
                SelectionManager.selectedSplat = null;
            }
        };

        controller.keyboardManager.registerKey("h", handleEnterDefaultMode);
        controller.mouseManager.registerMouse("mousedown", handleMouseDown);
        controller.mouseManager.registerMouse("mouseup", handleMouseUp);
        controller.orbitControls.enabled = false;
        controller.setModusText("Select");
        
        this.exit = () => {
            controller.keyboardManager.unregisterKey("h");
            controller.mouseManager.unregisterMouse("mousedown");
            controller.mouseManager.unregisterMouse("mouseup");
            controller.orbitControls.enabled = true;
        };
    }
}

export { SelectMode };
