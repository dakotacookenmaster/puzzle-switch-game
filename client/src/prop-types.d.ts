export type RadialDialProps = {
    count: number,
    diameter: number,
    rotation: {
        value: number,
        rotations: number
    },
    setRotation: React.Dispatch<React.SetStateAction<{ value: number, rotations: number}>>,
    ws: WebSocket
}