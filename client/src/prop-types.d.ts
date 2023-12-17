export type RadialDialProps = {
    count: number,
    diameter: number,
    rotation: number,
    setRotation: React.Dispatch<React.SetStateAction<number>>,
    ws: WebSocket
}