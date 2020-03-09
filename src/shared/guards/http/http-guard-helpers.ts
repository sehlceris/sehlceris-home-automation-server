import { ExecutionContext } from '@nestjs/common';
import { decodeJwtPayload } from '../../utilities/decode-jwt-payload';
import { GuardHelpers } from '../shared/guard-helpers';

export class HttpGuardHelpers extends GuardHelpers {

  static getBearerTokenFromContext(executionContext: ExecutionContext) {
    const request = executionContext.switchToHttp().getRequest();
    if (!request.bearerToken) {
      const headers = request.headers;
      const bearerToken = this.getBearerTokenFromHeaders(headers);
      request.bearerToken = bearerToken; // cache bearer token
    }
    return request.bearerToken;
  }

  static async getJwtFromContext<T>(executionContext: ExecutionContext, privateKey: string): Promise<T> {
    const bearerToken = this.getBearerTokenFromContext(executionContext);
    return decodeJwtPayload(bearerToken, privateKey);
  }

}
