import { ControlType } from "../controls/IControl";
import IChangeMessage from "./IControlChange";

class SwitchChange implements IChangeMessage {
    type: ControlType;
    id: string;
    value: boolean;
}

export default SwitchChange;