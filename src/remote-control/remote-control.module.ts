import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { RemoteControlController } from './remote-control.controller';
import { RemoteControlGateway } from './remote-control.gateway';
import { RemoteControlService } from './remote-control.service';

@Module({
  imports: [SharedModule],
  controllers: [RemoteControlController],
  providers: [RemoteControlService, RemoteControlGateway]
})
export class RemoteControlModule {}
