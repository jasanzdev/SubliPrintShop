import { corsOptions } from 'src/bootstrap/cors.config';
import { envs } from 'src/config/envs';
import { invalidOrigin, validOrigin } from '../../utils/constants';

describe('corsOptions', () => {
  const defaultCallback = jest.fn();
  envs.whitelist = ['https://myfrontend.com'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const callOrigin = (origin: string | undefined) => {
    if (typeof corsOptions.origin === 'function') {
      corsOptions.origin(origin as string, defaultCallback);
    } else {
      throw new Error('corsOptions.origin it is not a function');
    }
  };

  it('Allows requests without an origin.', () => {
    callOrigin(undefined);
    expect(defaultCallback).toHaveBeenCalledWith(null, true);
  });

  it('Allows origins exactly as specified in the whitelist.', () => {
    callOrigin(validOrigin);
    expect(defaultCallback).toHaveBeenCalledWith(null, true);
  });

  it('allow origins with the same hostname as specified in the whitelist.', () => {
    callOrigin(`${validOrigin}:3000`);
    expect(defaultCallback).toHaveBeenCalledWith(null, true);
  });

  it('Rejects requests from disallowed origins.', () => {
    callOrigin(invalidOrigin);
    expect(defaultCallback).toHaveBeenCalledWith(null, false);
  });

  it('Handles malformed URLs in a secure manner.', () => {
    callOrigin(':::::/');
    expect(defaultCallback).toHaveBeenCalledWith(null, false);
  });
});
