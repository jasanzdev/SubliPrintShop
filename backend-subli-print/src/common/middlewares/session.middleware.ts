import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { envs } from '../../config/envs';

export function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const sessionId = req.cookies?.['sessionId'] as string | undefined;

  if (!sessionId) {
    const newSessionId = uuidv4();
    res.cookie('sessionId', newSessionId, {
      httpOnly: true,
      secure: envs.nodeEnv === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 10,
    });
  }

  next();
}
