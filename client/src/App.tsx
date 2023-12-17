import { useState } from "react"
import "./App.css"
import RadialDial from "./components/RadialDial"
import getMessage from "./helpers/getMessage"
const ws = new WebSocket("ws://192.168.41.240:3000")

const App = () => {
  const [rotation, setRotation] = useState(0)

  ws.addEventListener("message", (ev: MessageEvent<any>) => {
    const { event, data } = getMessage(ev)

    if(event === "init") {
      setRotation(data.controls.find((datum: any) => datum.id === "a_radial_dial")!.value)
    } else if(event === "control_change") {
      setRotation(data.value)
    }
  })

  return (
    <RadialDial rotation={rotation} ws={ws} setRotation={setRotation} diameter={400} count={30} />
  )
}

export default App