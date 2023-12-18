import { useState } from "react"
import "./App.css"
import RadialDial from "./components/RadialDial"
import getMessage from "./helpers/getMessage"

const wsHost = import.meta.env.VITE_WS_HOST
const ws = new WebSocket(wsHost)

const App = () => {
    const [rotation, setRotation] = useState({
        value: 0,
        rotations: 0,
    })

    ws.addEventListener("message", (ev: MessageEvent<any>) => {
        const { event, data } = getMessage(ev)

        if (event === "init") {
            setRotation((prevRotation) => {
                const value = data.controls.find(
                    (datum: any) => datum.id === "a_radial_dial"
                )!.value

                if (prevRotation.value - value > 180) {
                    return {
                        value,
                        rotations: prevRotation.rotations + 1,
                    }
                } else if (prevRotation.value - value < -180) {
                    return {
                        value,
                        rotations: prevRotation.rotations - 1,
                    }
                } else {
                    return {
                        value,
                        rotations: prevRotation.rotations,
                    }
                }
            })
        } else if (event === "control_change") {
            setRotation((prevRotation) => {
                if (prevRotation.value - data.value > 180) {
                    return {
                        value: data.value,
                        rotations: prevRotation.rotations + 1,
                    }
                } else if (prevRotation.value - data.value < -180) {
                    return {
                        value: data.value,
                        rotations: prevRotation.rotations - 1,
                    }
                } else {
                    return {
                        value: data.value,
                        rotations: prevRotation.rotations,
                    }
                }
            })
        }
    })

    return (
        <RadialDial
            rotation={rotation}
            ws={ws}
            setRotation={setRotation}
            diameter={300}
            count={10}
        />
    )
}

export default App
