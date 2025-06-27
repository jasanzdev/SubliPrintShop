import { Profile } from 'passport-google-oauth20';

export const mockProfile: Profile = {
  id: 'google-id',
  displayName: 'test',
  emails: [{ value: 'test@example.com', verified: true }],
  photos: [{ value: 'photo-url' }],
  provider: 'google',
  profileUrl: 'url_profile',
  _raw: '',
  _json: {
    family_name: 'test',
    given_name: 'user',
    iss: '',
    aud: '',
    sub: '',
    iat: 4424,
    exp: 44456345,
  },
};
