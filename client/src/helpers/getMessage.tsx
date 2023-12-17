const getMessage = (event: MessageEvent<any>): { event: string, data: any } => {
    return JSON.parse(event.data)
}

export default getMessage