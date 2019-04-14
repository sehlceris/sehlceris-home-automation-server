import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ConfigurationService } from '../shared/configuration/configuration.service';
import { BoundLogger, LogService } from '../shared/utilities/log.service';
import { Server } from 'socket.io';
import { RemoteControlWebsocketEvent } from './remote-control-websocket-event.enum';
import { RemoteControlService } from './remote-control.service';

@WebSocketGateway()
export class RemoteControlGateway {

  @WebSocketServer() server: Server;

  private log: BoundLogger = this.logService.bindToNamespace(RemoteControlGateway.name);

  constructor(
    private remoteControlService: RemoteControlService,
    private configurationService: ConfigurationService,
    private logService: LogService,
  ) {
    this.remoteControlService.sleepComputersRequested.subscribe(() => this.requestSleepComputers());
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello!';
  }

  private requestSleepComputers() {
    this.server.emit(RemoteControlWebsocketEvent.SleepComputersRequest);
  }
}
