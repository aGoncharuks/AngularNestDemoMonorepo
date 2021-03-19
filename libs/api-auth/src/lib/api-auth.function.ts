import { ApiEnvironment, AuthOptions } from '@wise-guy/data';
import { VerifyOptions } from 'jsonwebtoken';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwksRsa from 'jwks-rsa';

export function getAuthOptionsFromApiEnvironment(config: ApiEnvironment): AuthOptions {
  return {
    audience: config.AUTH0_AUDIENCE,
    issuer: `${config.AUTH0_DOMAIN}/`,
    namespace: config.AUTH0_NAMESPACE,
    emailClaimName: config.AUTH0_EMAIL_CLAIM_NAME,
    algorithms: ['RS256']
  };
}

export function createJwksRsaClient(options: AuthOptions) {
  return jwksRsa({
    jwksUri: `${options.issuer}.well-known/jwks.json`
  });
}

export function getSigningKey(client){
  return function(header, cb) {
    return client.getSigningKey(header.kid, function(err, key) {
      if (err) {
        cb(err);
        return;
      }
      const signingKey = key.publicKey || key.rsaPublicKey;
      cb(null, signingKey);
    });
  }
}

export function identifyUserByRequestToken(client, token: string, options: AuthOptions) {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, getSigningKey(client), options as VerifyOptions, (err, decoded) => {
      if(err) {
        return reject(err);
      }
      resolve(decoded.sub);
    });
  });
}
