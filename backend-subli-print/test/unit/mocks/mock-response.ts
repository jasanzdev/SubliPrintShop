import { Response } from 'express';

export const createMockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};

  res.cookie = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};
