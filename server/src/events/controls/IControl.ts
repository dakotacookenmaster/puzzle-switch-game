
interface IControl {
    id: string;
    type: ControlType;
}

enum ControlType {
    Switch = "switch",
    RadialDial = "radial_dial"
}

export { IControl, ControlType }