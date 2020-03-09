import {verify} from 'jsonwebtoken';

export const decodeJwtPayload = async function<T>(jwtStr: string, privateKey: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    verify(jwtStr, privateKey, function(err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
