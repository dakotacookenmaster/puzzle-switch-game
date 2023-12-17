import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { WebSocketServer as Server } from 'ws';
import WebSocket = require("ws");
import { ControlType, IControl } from "./controls/IControl";
import RadialDialChange from "./messages/RadialDialChange";
import RadialDial from "./controls/RadialDial";
import { Request } from "@nestjs/common";
import { Request as ExpressRequest } from "express";


const controls: Array<IControl> = [
  ({
    id: 'a_radial_dial',
    type: ControlType.RadialDial,
    value: 0,
  } as RadialDial)

];

@WebSocketGateway()
export class EventsGateway {

  @WebSocketServer()
  server: Server;

  afterInit(server: Server): void {
    // console.log(server);
  }

  handleConnection(client: WebSocket, ...args: any[]): void {
    console.log('client connected');
    client.send(JSON.stringify({ event: "init", data: { controls: Array.from(controls.values()) } }))

    // return { event: 'init', data: { controls: Array.from(controls.values()) } };
  }

  @SubscribeMessage('join')
  handleJoinEvent(): void {
    console.log('join');

  }

  @SubscribeMessage('control_change')
  handleControlChangeEvent(@ConnectedSocket() client: WebSocket, @MessageBody() data: RadialDialChange, @Request() request: ExpressRequest): void {
    // console.log('client', client);

    if (data.type === ControlType.RadialDial) {
      const control = controls.find(control => control.id === data.id) as RadialDial;
      control.value = data.value;
    }

    console.log((client as any)._socket.remotePort);

    console.log('data', data);
    // client.
    // this.server.emit('control_change', data)
    Array.from(this.server.clients.keys()).filter(c => c != client).forEach((client: WebSocket) => { client.send(JSON.stringify({ data, event: "control_change" })) }) // .filter(socket => socket != client)
    // this.server
  }
}



