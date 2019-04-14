import {Global, Module} from '@nestjs/common';
import {ConfigurationService} from './configuration/configuration.service';
import {LogService} from './utilities/log.service';

const SERVICES = [ConfigurationService, LogService];

@Global()
@Module({
  imports: [],
  exports: [...SERVICES],
  providers: [...SERVICES],
})
export class SharedModule {}
