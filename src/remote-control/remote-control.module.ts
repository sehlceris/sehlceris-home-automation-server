import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {RemoteControlController} from './remote-control.controller';
import {MqttService} from './mqtt.service';

@Module({
  imports: [SharedModule],
  controllers: [RemoteControlController],
  providers: [MqttService],
})
export class RemoteControlModule {}
