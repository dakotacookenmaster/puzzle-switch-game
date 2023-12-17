const sendMessage = (ws: WebSocket, message: { event: string, data: any }) => {
    if(ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(message))
    }
}

export default sendMessage