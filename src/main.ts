import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationKey } from './configuration-key.enum';
import { ConfigurationService } from './shared/configuration/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(ConfigurationService.get(ConfigurationKey.port));
}
bootstrap();
