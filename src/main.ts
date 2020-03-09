import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigurationService} from './shared/configuration/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ConfigurationService.get('serverPort'));
}
bootstrap();
