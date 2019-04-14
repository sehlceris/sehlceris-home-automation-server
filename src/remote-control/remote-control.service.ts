import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { ConfigurationService } from '../shared/configuration/configuration.service';
import { BoundLogger, LogService } from '../shared/utilities/log.service';

@Injectable()
export class RemoteControlService {

  private sleepComputersRequestedSubject: Subject<void> = new Subject();
  sleepComputersRequested: Observable<void> = this.sleepComputersRequestedSubject.asObservable();

  private log: BoundLogger = this.logService.bindToNamespace(RemoteControlService.name);

  constructor(
    private configurationService: ConfigurationService,
    private logService: LogService,
  ) {

  }

  sleepComputers() {
    this.sleepComputersRequestedSubject.next();
  }

}
