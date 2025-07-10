import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createTestApp } from '../../utils/create-app';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from 'src/app.module';
import { loginRoute } from '../../utils/constants';
import { TokenService } from 'src/modules/auth/services/token.service';
import { RefreshToken } from 'src/modules/auth/schemas/refresh-token.schema';
import { envs } from 'src/config/envs';

describe('AuthController (e2e)', () => {
  let app: NestExpressApplication;
  let userModel: Model<User>;
  let refreshTokenModel: Model<RefreshToken>;
  let tokenService: TokenService;

  const testUser = {
    name: 'test',
    username: 'testing',
    email: 'testing@example.com',
    password: 'Test1234!',
    role: 'CLIENT',
    provider: 'local',
  };

  const validCredentials = {
    email: 'testing@example.com',
    password: 'Test1234!',
  };

  beforeAll(async () => {
    app = await createTestApp({ useCsrf: false });
    const moduleRef = app.select(AppModule);
    userModel = moduleRef.get<Model<User>>(getModelToken(User.name));
    refreshTokenModel = moduleRef.get<Model<RefreshToken>>(
      getModelToken(RefreshToken.name),
    );
    tokenService = moduleRef.get(TokenService);
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  describe('auth/login', () => {
    it('should authenticate with valid credentials and return access_token and set refresh_token in cookie', async () => {
      await refreshTokenModel.deleteMany({});
      const hashedPassword = await bcrypt.hash(testUser.password, 10);
      await userModel.create({ ...testUser, password: hashedPassword });
      const res = await request(app.getHttpServer())
        .post(loginRoute)
        .send(validCredentials)
        .expect(200);

      expect(res.body).toHaveProperty('access_token');
      expect(res.headers['set-cookie']).toEqual(
        expect.arrayContaining([expect.stringContaining('refresh_token=')]),
      );
    });
  });

  describe('auth/refresh', () => {
    it('should return new access_token and set refresh_token in cookie with valid refresh token', async () => {
      const hashedPassword = await bcrypt.hash(testUser.password, 10);
      const user = await userModel.create({
        ...testUser,
        password: hashedPassword,
      });

      const { refresh_token } = await tokenService.generateTokens({
        sub: String(user._id),
        email: user.email,
        role: user.role,
      });

      const res = await request(app.getHttpServer())
        .post('/api/sps1/auth/refresh')
        .set('Cookie', [`refresh_token=${refresh_token}`])
        .expect(200);

      expect(res.body).toHaveProperty('access_token');
      expect(res.headers['set-cookie']).toEqual(
        expect.arrayContaining([expect.stringContaining('refresh_token=')]),
      );
    });
  });

  describe('auth/logout', () => {
    it('should delete refresh token from database and clear cookies', async () => {
      const hashedPassword = await bcrypt.hash(testUser.password, 10);
      const user = await userModel.create({
        ...testUser,
        password: hashedPassword,
      });

      const { access_token } = await tokenService.generateTokens({
        sub: String(user._id),
        email: user.email,
        role: user.role,
      });

      const res = await request(app.getHttpServer())
        .post('/api/sps1/auth/logout')
        .set('Authorization', `Bearer ${access_token}`)
        .expect(204);

      expect(
        await refreshTokenModel.findOne({ email: user.email }).exec(),
      ).toBeNull();
      expect(res.headers['set-cookie']).toEqual(
        expect.arrayContaining([expect.stringMatching('refresh_token=;')]),
      );
    });
  });

  describe('auth/google', () => {
    it('should set cookie and redirect to frontend', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/sps1/auth/google/redirect')
        .expect(302);

      expect(res.headers['set-cookie']).toEqual(
        expect.arrayContaining([expect.stringContaining('refresh_token=')]),
      );

      expect(res.headers['location']).toBe(envs.frontendRedirectUri);
    });
  });

  afterAll(async () => {
    await app.close();
    await mongoose.connection.db?.dropDatabase();
    await mongoose.disconnect();
  });
});
