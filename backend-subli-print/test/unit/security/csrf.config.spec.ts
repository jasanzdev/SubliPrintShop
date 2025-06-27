import { Request } from 'express';
import { csrfUtils } from 'src/config/csrf.config';

describe('CSRF Config', () => {
  describe('getSessionIdentifier()', () => {
    it('should return the sessionId if present in the cookies', () => {
      const req = {
        cookies: {
          sessionId: 'abc123',
        },
        ip: '1.2.3.4',
      } as unknown as Request;

      const id = csrfUtils.getSessionIdentifier(req);
      expect(id).toBe('abc123');
    });

    it('should use the IP address if there is no sessionId.', () => {
      const req = {
        cookies: {},
        ip: '5.6.7.8',
      } as unknown as Request;

      const id = csrfUtils.getSessionIdentifier(req);
      expect(id).toBe('5.6.7.8');
    });
  });

  describe('getCsrfTokenFromRequest()', () => {
    it('should retrieve the token from the header.', () => {
      const req = {
        headers: { 'x-csrf-token': 'from-header' },
        body: {},
      } as Request;

      expect(csrfUtils.getCsrfTokenFromRequest(req)).toBe('from-header');
    });

    it('should retrieve the token from body if not present in the header', () => {
      const req = {
        headers: {},
        body: { _csrf: 'from-body' },
      } as Request;

      expect(csrfUtils.getCsrfTokenFromRequest(req)).toBe('from-body');
    });

    it('should return undefined if the token is not present', () => {
      const req = {
        headers: {},
        body: {},
      } as Request;

      expect(csrfUtils.getCsrfTokenFromRequest(req)).toBeUndefined();
    });
  });
});
