import { ControlType } from "../controls/IControl";
import IChangeMessage from "./IControlChange";

class RadialDialChange implements IChangeMessage {
    type: ControlType;
    id: string;
    value: number;
}

export default RadialDialChange;