import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemoteControlModule } from './remote-control/remote-control.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [RemoteControlModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
