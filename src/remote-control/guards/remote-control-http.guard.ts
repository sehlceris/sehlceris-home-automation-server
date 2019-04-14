import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigurationKey } from '../../configuration-key.enum';
import { IRemoteControlApiKey } from '../../shared/configuration/configuration.interface';
import { ConfigurationService } from '../../shared/configuration/configuration.service';
import { HttpGuardHelpers } from '../../shared/guards/guards/http/http-guard-helpers';
import { BoundLogger, LogService } from '../../shared/utilities/log.service';

@Injectable()
export class RemoteControlHttpGuard implements CanActivate {

  protected log: BoundLogger = this.logService.bindToNamespace(RemoteControlHttpGuard.name);

  protected constructor(
    protected configurationService: ConfigurationService,
    protected logService: LogService,
  ) {
  }

  canActivate(executionContext: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const apiKeys = this.configurationService.get<IRemoteControlApiKey[]>(ConfigurationKey.apiKeys);

    const request = executionContext.switchToHttp().getRequest();

    const bearerToken: string = request.query.authorization || HttpGuardHelpers.getBearerTokenFromContext(executionContext);
    const key: IRemoteControlApiKey | null = apiKeys.find((apiKey) =>  apiKey.key === bearerToken );
    if (key) {
      this.log.info(`authorized remote control command from bearer id: '${key.id}'`);
      return true;
    }
    else {
      this.log.warn(`rejected unauthorized remote control command with bearer token: ${bearerToken}`);
      return false;
    }
  }
}
