export interface IRemoteControlApiKey {
  id: string;
  key: string;
}

export interface IConfiguration {
  port: number;
  apiKeys: IRemoteControlApiKey[];
}
