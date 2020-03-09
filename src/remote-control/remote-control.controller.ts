import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigurationService } from '../shared/configuration/configuration.service';
import { BoundLogger, LogService } from '../shared/utilities/log.service';
import { RemoteControlHttpApiKeyGuard } from './guards/remote-control-http-api-key-guard.service';
import { MqttService } from './mqtt.service';

// this type is just here for documentation purposes
export type RemoteControlMqttTopic =
  'sleepComputerRequest'
  | 'shutdownComputerRequest'
  | 'wakeComputerRequest'
  ;

@Controller('remote-control')
export class RemoteControlController {

  private log: BoundLogger = this.logService.bindToNamespace(RemoteControlController.name);

  constructor(
    private mqttService: MqttService,
    private configurationService: ConfigurationService,
    private logService: LogService,
  ) {

  }

  @Post('sleepComputers')
  @UseGuards(RemoteControlHttpApiKeyGuard)
  async sleepComputers() {
    this.log.info('responding to remote control command to sleep computers');
    await this.mqttService.publishMessage('sleepComputerRequest');
  }

  @Post('shutdownComputers')
  @UseGuards(RemoteControlHttpApiKeyGuard)
  async shutdownComputers() {
    this.log.info('responding to remote control command to shutdown computers');
    await this.mqttService.publishMessage('shutdownComputerRequest');
  }

  @Post('wakeComputers')
  @UseGuards(RemoteControlHttpApiKeyGuard)
  async wakeComputers() {
    this.log.info('responding to remote control command to wake computers');
    await this.mqttService.publishMessage('wakeComputerRequest');
  }

}
