import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createTestApp } from '../../utils/create-app';
import { disconnect, Model } from 'mongoose';
import { GqlBadRequestErrorResponse } from '../../utils/interfaces';
import { User } from 'src/modules/users/schemas/user.schema';
import { AppModule } from 'src/app.module';
import { getModelToken } from '@nestjs/mongoose';

describe('UserResolver (e2e)', () => {
  let app: NestExpressApplication;
  let userModel: Model<User>;
  let userId: string;

  beforeAll(async () => {
    app = await createTestApp({ useCsrf: false });
    const moduleRef = app.select(AppModule);
    userModel = moduleRef.get<Model<User>>(getModelToken(User.name));
  });

  describe('CreateUser', () => {
    it('Should return specified fields with the valid input', async () => {
      interface GqlResponse {
        body: {
          data: {
            createUser: { _id: string; name: string; email: string };
            users: {
              name: string;
              email: string;
            };
          };
        };
      }
      await userModel.deleteMany({});
      const createUserMutation = `
      mutation {
        createUser(input: {
           name: "test",
           username: "testing",
           email: "testing@example.com",
           password: "Password123!",
           confirmPassword: "Password123!"
        }) {
           _id
          name
          email
       }
      }
      `;
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: createUserMutation })
        .expect(200);

      expect((res as GqlResponse).body.data).toBeDefined();
      expect((res as GqlResponse).body.data.createUser).toBeDefined();
      expect((res as GqlResponse).body.data.createUser.name).toBeDefined();
      expect((res as GqlResponse).body.data.createUser.email).toBeDefined();

      userId = (res as GqlResponse).body.data.createUser._id;
    });
  });

  describe('users', () => {
    it('Query Users should return a list of users', async () => {
      interface GqlResponse {
        body: {
          data: {
            users: {
              name: string;
              email: string;
            };
          };
        };
      }
      const usersQuery = `
      query {
        users {
          name
          email
       }
      }
      `;
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: usersQuery });

      expect((res as GqlResponse).body.data).toBeDefined();
      expect(Array.isArray((res as GqlResponse).body.data.users)).toBeTruthy();
      expect((res as GqlResponse).body.data.users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'test' }),
          expect.objectContaining({ email: 'testing@example.com' }),
        ]),
      );
    });
  });

  describe('user', () => {
    it('Should return an user with the correct id', async () => {
      interface GqlResponse {
        body: {
          data: {
            user: {
              name: string;
              email: string;
            };
          };
        };
      }
      const userQuery = ` 
          query {
            user(id: "${userId}") {
              name
              email
          }
        }
    `;
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: userQuery });

      expect((res as GqlResponse).body.data.user).toBeDefined();
      expect((res as GqlResponse).body.data.user.name).toBe('test');
      expect((res as GqlResponse).body.data.user.email).toBe(
        'testing@example.com',
      );
    });

    it('Should throw BadRequestException if ID is invalid', async () => {
      const userQuery = `
      query {
        user(id: "1234Wrong") {
          name
          email
          }
          }
          `;
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: userQuery });

      const { errors } = res.body as {
        errors: Array<GqlBadRequestErrorResponse>;
      };

      expect(errors).toBeDefined();
      expect(errors[0].extensions.responseData).toEqual({
        message: 'Invalid Id',
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('updateUser', () => {
    it('Should return specified fields with the valid input', async () => {
      interface GqlResponse {
        body: {
          data: {
            updateUser: {
              name: string;
              email: string;
            };
          };
        };
      }
      const updateUserMutation = `
        mutation {
          updateUser(input: {
            id: "${userId}"   
            name: "testing",
          }) {
            name
            email
         }
      }
  `;
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: updateUserMutation });

      expect((res as GqlResponse).body.data.updateUser).toBeDefined();
      expect((res as GqlResponse).body.data.updateUser.name).toBe('testing');
    });

    it('Should throw BadRequestException if ID is invalid', async () => {
      const updateUserMutation = `
        mutation {
          updateUser(input: {
            id: "12345wrong"   
            name: "testing",
          }) {
            name
            email
         }
      }
  `;

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: updateUserMutation });

      const { errors } = res.body as {
        errors: Array<GqlBadRequestErrorResponse>;
      };

      expect(errors).toBeDefined();
      expect(errors[0].extensions.responseData).toEqual({
        message: 'Invalid Id',
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('resetPassword', () => {
    it('Should return specified fields with the valid input', async () => {
      interface GqlResponse {
        body: {
          data: {
            resetPassword: {
              name: string;
              email: string;
            };
          };
        };
      }
      const resetPasswordMutation = `
                              mutation {
                                resetPassword(input: {
                                  email: "testing@example.com",   
                                  password: "Password123!",
                                 newPassword: "Password123!!",
                                 confirmPassword: "Password123!!",
                               }) {
                                  name
                                 email
                              }
                            }
                            `;
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: resetPasswordMutation });

      expect((res as GqlResponse).body.data.resetPassword).toBeDefined();
      expect((res as GqlResponse).body.data.resetPassword.email).toBe(
        'testing@example.com',
      );
    });
  });

  describe('removeUser', () => {
    it('Should return false with the incorrect id', async () => {
      const removeMutation = `
                            mutation{
                              removeUser(id : "wrongId")
                            }
                         `;

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: removeMutation });

      const { errors } = res.body as {
        errors: Array<GqlBadRequestErrorResponse>;
      };

      expect(errors).toBeDefined();
      expect(errors[0].extensions.responseData).toEqual({
        message: 'Invalid Id',
        error: 'Bad Request',
        statusCode: 400,
      });
    });

    it('Should return true with correct id', async () => {
      interface GqlResponse {
        body: {
          data: {
            removeUser: boolean;
          };
        };
      }
      const removeMutation = `
                            mutation{
                              removeUser(id : "${userId}")
                            }
                         `;

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: removeMutation });

      expect((res as GqlResponse).body.data.removeUser).toBeTruthy();
    });
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });
});
