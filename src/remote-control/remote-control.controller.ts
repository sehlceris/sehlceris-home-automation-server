import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigurationService } from '../shared/configuration/configuration.service';
import { BoundLogger, LogService } from '../shared/utilities/log.service';
import { RemoteControlHttpGuard } from './guards/remote-control-http.guard';
import { RemoteControlService } from './remote-control.service';

@Controller('remote-control')
export class RemoteControlController {

  private log: BoundLogger = this.logService.bindToNamespace(RemoteControlController.name);

  constructor(
    private remoteControlService: RemoteControlService,
    private configurationService: ConfigurationService,
    private logService: LogService,
  ) {

  }

  @Post('sleepComputers')
  @UseGuards(RemoteControlHttpGuard)
  sleepComputers() {
    this.log.info('responding to remote control command to sleep computers');
    return this.remoteControlService.sleepComputers();
  }

}
