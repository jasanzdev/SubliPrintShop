import { Request, NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createMockResponse } from '../mocks/mock-response';
import { sessionMiddleware } from 'src/bootstrap/session.middleware';

jest.mock('uuid');
const mockedUuid = uuidv4 as jest.Mock;

describe('sessionMiddleware', () => {
  let req: Partial<Request>;
  const next: NextFunction = jest.fn();

  beforeEach(() => {
    mockedUuid.mockReturnValue('mocked-uuid');
    req = { cookies: {} };
  });

  it('It must generate a sessionId if it does not exist.', () => {
    const res = createMockResponse();

    sessionMiddleware(req as Request, res as Response, next);

    expect(res.cookie).toHaveBeenCalledWith(
      'sessionId',
      'mocked-uuid',
      expect.objectContaining({
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 1000 * 60 * 10,
      }),
    );

    expect(next).toHaveBeenCalled();
  });

  it('It must not generate a cookie if a sessionId already exists.', () => {
    const res = createMockResponse();
    req.cookies = { sessionId: 'already exists' };

    sessionMiddleware(req as Request, res as Response, next);

    expect(res.cookie).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
