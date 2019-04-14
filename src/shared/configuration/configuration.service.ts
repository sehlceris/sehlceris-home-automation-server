import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { IConfiguration } from './configuration.interface';

const CONFIG_PATH = './config.json';
const config: IConfiguration = Object.freeze(JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')));

export enum Environment {
  Development = 'development',
  Testing = 'testing',
  Production = 'production',
}

@Injectable()
export class ConfigurationService {

  private _config: IConfiguration;

  constructor() {
    this._config = config;
  }

  static environment: string = process.env.NODE_ENV || Environment.Development;

  static get config(): IConfiguration {
    return config;
  }

  static get<T>(key: string): T {
    return this.config[key];
  }

  // ***** instance methods

  get environment(): string {
    return ConfigurationService.environment;
  }

  get config(): IConfiguration {
    return ConfigurationService.config;
  }

  get<T>(key: string): T {
    return ConfigurationService.get<T>(key);
  }
}
