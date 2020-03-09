import {Injectable} from '@nestjs/common';
import {ConfigurationService} from '../shared/configuration/configuration.service';
import {BoundLogger, LogService} from '../shared/utilities/log.service';
import {AsyncMqttClient} from 'async-mqtt';
import * as asyncMqtt from 'async-mqtt';

@Injectable()
export class MqttService {
  private log: BoundLogger = this.logService.bindToNamespace(MqttService.name);

  private mqttBrokerUri = this.configurationService.get<string>('mqttBrokerUri');
  private mqttUsername = this.configurationService.get<string>('mqttUsername');
  private mqttPassword = this.configurationService.get<string>('mqttPassword');
  private mqttClient: AsyncMqttClient;

  constructor(private configurationService: ConfigurationService, private logService: LogService) {
    this.connectToMqtt()
      .then(() => {})
      .catch((err) => process.exit(1));
  }

  async publishMessage(topic: string, message?: string | object): Promise<void> {
    if (this.mqttClient && this.mqttClient.connected) {
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
      this.log.info(`publishing message to topic: ${topic}`);
      await this.mqttClient.publish(topic, message);
    } else {
      const errorMessage = 'unable to emit message due to mqtt client not being connected';
      this.log.error(errorMessage);
      throw errorMessage;
    }
  }

  private async connectToMqtt() {
    this.log.info(
      `connecting to mqtt broker at ${this.mqttBrokerUri} with user '${this.mqttUsername}'`,
    );
    if (this.mqttClient) {
      await this.mqttClient.end();
      this.mqttClient = null;
    }
    this.mqttClient = await asyncMqtt.connectAsync(this.mqttBrokerUri, {
      username: this.mqttUsername,
      password: this.mqttPassword,
    });
    this.log.info('mqtt client connected');
  }
}
