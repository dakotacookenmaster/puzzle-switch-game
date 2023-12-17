import { useRef, useState } from "react"
import { RadialDialProps } from "../prop-types"

const RadialDial = (props: RadialDialProps) => {
    const { count, diameter, rotation, setRotation, ws } = props
    const dialRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [offsetAngle, setOffsetAngle] = useState(0)

    const convertToUnitMeasurement = (degrees: number) => {
        if (degrees < 0) {
            return 360 - (-degrees % 360)
        } else {
            return degrees % 360
        }
    }

    const getAngleFromCenter = (position: { x: number; y: number }) => {
        const dial = dialRef.current?.getBoundingClientRect()

        if (dial) {
            const xCenter = (dial.left + dial.right) / 2
            const yCenter = (dial.top + dial.bottom) / 2

            const adjacent = position.x - xCenter
            const opposite = position.y - yCenter

            const angleInRadians = Math.atan2(opposite, adjacent)
            let angleInDegrees = (angleInRadians * 180) / Math.PI

            return angleInDegrees
        }

        return 0
    }

    const computeRotation = (mousePosition: { x: number; y: number }) => {
        let angle =
            getAngleFromCenter({ x: mousePosition.x, y: mousePosition.y }) +
            offsetAngle
        setRotation(convertToUnitMeasurement(angle))

        ws.send(
            JSON.stringify({
                event: "control_change",
                data: {
                    id: "a_radial_dial",
                    type: "radial_dial",
                    value: angle
                },
            })
        )
    }

    return (
        <div
            style={{
                background: "black",
                width: "fit-content",
                padding: "30px",
                paddingTop: "20px",
                borderRadius: "10px",
                display: "flex",
                gap: "10px",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: 0,
                    height: 0,
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderTop: "10px solid green",
                }}
            ></div>
            <div
                ref={dialRef}
                className="radial-dial-container"
                style={{
                    height: diameter,
                    width: diameter,
                    position: "relative",
                    cursor: isDragging ? "grabbing" : undefined,
                    transform: `rotate(${rotation.toFixed(5)}deg)`,
                }}
                onMouseDown={(event) => {
                    setIsDragging(true)
                    setOffsetAngle(
                        convertToUnitMeasurement(
                            rotation -
                                getAngleFromCenter({
                                    x: event.pageX,
                                    y: event.pageY,
                                })
                        )
                    )
                }}
                onMouseUp={() => {
                    setIsDragging(false)
                }}
                onMouseLeave={() => {
                    setIsDragging(false)
                }}
                onMouseMove={(event) => {
                    if (isDragging) {
                        computeRotation({ x: event.pageX, y: event.pageY })
                    }
                }}
            >
                <div
                    className="radial-dial"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {[...Array(count)].map((_, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    transformOrigin: "bottom left",
                                    transform: `rotate(${(
                                        (360 / count) *
                                        i
                                    ).toFixed(5)}deg)`,
                                    height: `${diameter / 2}px`,
                                    borderColor: i === 0 ? "red" : "black",
                                    borderWidth: i === 0 ? "4px" : "2px",
                                }}
                                className="notch"
                            ></div>
                        )
                    })}
                </div>
                <div
                    style={{
                        position: "absolute",
                        display: "flex",
                        transform: `translate(-50%, -50%)`,
                        borderRadius: "100%",
                        top: "50%",
                        left: "50%",
                        background: "gray",
                        width: diameter / 1.2,
                        height: diameter / 1.2,
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 0,
                    }}
                >
                    <h1
                        style={{
                            transform: `rotate(-${rotation.toFixed(5)}deg)`,
                            userSelect: "none",
                        }}
                    >
                        {rotation.toFixed(2)}&deg;
                    </h1>
                </div>
                <div
                    className="numbers"
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%)`,
                        width: diameter / 1.2,
                        height: diameter / 1.2,
                        borderRadius: "100%",
                        top: "50%",
                        left: "50%",
                    }}
                >
                    {[...Array(count)].map((_, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    position: "absolute",
                                    height: diameter / 2,
                                    left: `50%`,
                                    top: "-10%",
                                    transformOrigin: "bottom left",
                                    transform: `rotate(${(
                                        (360 / count) *
                                        i
                                    ).toFixed(5)}deg)`,
                                }}
                            >
                                <div
                                    style={{
                                        marginTop: "35px",
                                        marginLeft: "-3px",
                                        userSelect: "none",
                                    }}
                                >
                                    {i}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default RadialDial
