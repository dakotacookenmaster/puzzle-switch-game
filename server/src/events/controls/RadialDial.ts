import { IControl, ControlType } from "./IControl";

class RadialDial implements IControl {
    type: ControlType;
    id: string;
    value: number;
}

export default RadialDial;