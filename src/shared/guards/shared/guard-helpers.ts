import {HttpException, HttpStatus} from '@nestjs/common';

export class GuardHelpers {
  static getBearerTokenFromHeaders(headers): string {
    if (!headers || !(headers['authorization'] || headers['Authorization'])) {
      throw new HttpException('No authorization header provided', HttpStatus.UNAUTHORIZED);
    }

    const authHeader = headers['authorization'] || headers['Authorization'];

    const split = authHeader.split(' ');
    if (split && split.length === 2 && (split[0] === 'Bearer' || split[0] === 'bearer')) {
      const jwtStr = split[1];
      return jwtStr;
    }
    throw new HttpException(
      'Authorization header is not in expected format: Bearer {{jwt}}',
      HttpStatus.BAD_REQUEST,
    );
  }
}
