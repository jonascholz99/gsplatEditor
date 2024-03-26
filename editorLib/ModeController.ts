import { Mode } from "./Mode"

class ModeController {
    private static _instance: ModeController;

    private static _modeFactories: Map<string, () => Mode> = new Map();
    private static _currentMode: Mode | null = null;

    public static get instance(): ModeController {
        if (!ModeController._instance) {
            ModeController._instance = new ModeController();
        }
        return ModeController._instance;
    }

    public static registerMode(name: string, factory: () => Mode) {
        this._modeFactories.set(name, factory);
    }

    public static enterMode(name: string) {
        const factory = this._modeFactories.get(name);
        if (factory) {
            this._currentMode?.exit();
            this._currentMode = factory();
        } else {
            console.error(`No mode registered with name ${name}.`);
        }
    }

    public static exitCurrentMode() {
        this._currentMode?.exit();
        this._currentMode = null;
    }
}

export { ModeController }