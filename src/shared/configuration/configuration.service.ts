import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { IAppConfiguration } from './configuration.interface';

const CONFIG_PATH = './config.json';
const config: IAppConfiguration = Object.freeze(JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')));

export enum Environment {
  Development = 'development',
  Testing = 'testing',
  Production = 'production',
}

@Injectable()
export class ConfigurationService {

  private _config: IAppConfiguration;

  constructor() {
    this._config = config;
  }

  static environment: string = process.env.NODE_ENV || Environment.Development;

  static get config(): IAppConfiguration {
    return config;
  }

  static get<T>(key: string): T {
    return this.config[key];
  }

  // ***** instance methods

  get environment(): string {
    return ConfigurationService.environment;
  }

  get config(): IAppConfiguration {
    return ConfigurationService.config;
  }

  get<T>(key: string): T {
    return ConfigurationService.get<T>(key);
  }
}
