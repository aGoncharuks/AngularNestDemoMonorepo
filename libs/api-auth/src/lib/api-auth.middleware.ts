import { Inject, NestMiddleware } from '@nestjs/common';
import { ApiAuthClient, AUTH_CLIENT } from '@wise-guy/data';
import { identifyUserByRequestToken } from './api-auth.function';

export class ApiAuthMiddleware implements NestMiddleware {
  constructor(@Inject(AUTH_CLIENT) private authClient: ApiAuthClient) {
  }
  async use(req: Request, res: Response, next: Function) {
    const authToken = req.headers['authorization'];
    if (!authToken) {
      next();
      return;
    }
    const userId = await identifyUserByRequestToken(
      this.authClient.jwksClient,
      authToken,
      this.authClient.authOptions
    );
    if (!userId) {
      next();
      return;
    }
    (req as any).userId = userId;
    next();
  }
}
