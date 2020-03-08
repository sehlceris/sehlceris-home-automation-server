export interface IRemoteControlApiKey {
  id: string;
  key: string;
}

export interface IAppConfiguration {
  port: number;
  apiKeys: IRemoteControlApiKey[];
}
