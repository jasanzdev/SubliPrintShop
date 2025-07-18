import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createTestApp } from '../../utils/create-app';
import mongoose, { Model } from 'mongoose';
import { GqlBadRequestErrorResponse } from '../../utils/interfaces';
import { User } from 'src/modules/users/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('UserResolver (e2e)', () => {
  let app: NestExpressApplication;
  let userModel: Model<User>;
  let mongod: MongoMemoryServer;

  const createUser = async () => {
    const password = await bcrypt.hash('Password123!', 10);
    const user: User = await userModel.create({
      name: 'test',
      username: 'testing',
      email: 'testing@example.com',
      password: password,
    });

    return user;
  };

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const result = await createTestApp({ useCsrf: false, mongoUri: uri });
    app = result.app;
    userModel = result.moduleRef.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(async () => {
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });

  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  describe('CreateUser', () => {
    it('Should return specified fields with the valid input', async () => {
      await userModel.deleteMany({});
      interface GqlResponse {
        body: {
          data: {
            createUser: { _id: string; name: string; email: string };
          };
        };
      }

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
        .send({ query: createUserMutation });

      expect((res as GqlResponse).body.data).toBeDefined();
      expect((res as GqlResponse).body.data).toEqual(
        expect.objectContaining({
          createUser: {
            _id: (res as GqlResponse).body.data.createUser._id,
            name: 'test',
            email: 'testing@example.com',
          },
        }),
      );
    });
  });

  describe('users', () => {
    it('Query Users should return a list of users', async () => {
      await userModel.deleteMany({});
      await createUser();

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
      await userModel.deleteMany({});
      const { _id } = await createUser();
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
            user(id: "${String(_id)}") {
              name
              email
          }
        }
    `;
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: userQuery });

      expect((res as GqlResponse).body.data).toBeDefined();
      expect((res as GqlResponse).body.data).toEqual(
        expect.objectContaining({
          user: {
            name: 'test',
            email: 'testing@example.com',
          },
        }),
      );
    });

    it('Should throw BadRequestException if ID is invalid', async () => {
      await userModel.deleteMany({});
      await createUser();
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
      await userModel.deleteMany({});
      const { _id } = await createUser();
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
            id: "${String(_id)}"   
            name: "updated",
          }) {
            name
            email
         }
      }
  `;
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: updateUserMutation });

      expect((res as GqlResponse).body.data).toBeDefined();
      expect((res as GqlResponse).body.data).toEqual(
        expect.objectContaining({
          updateUser: {
            name: 'updated',
            email: 'testing@example.com',
          },
        }),
      );
    });

    it('Should throw BadRequestException if ID is invalid', async () => {
      await userModel.deleteMany({});
      await createUser();
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
      await userModel.deleteMany({});
      await createUser();
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

      expect((res as GqlResponse).body.data).toBeDefined();
      expect((res as GqlResponse).body.data).toEqual(
        expect.objectContaining({
          resetPassword: {
            name: 'test',
            email: 'testing@example.com',
          },
        }),
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
      await userModel.deleteMany({});
      const { _id } = await createUser();
      interface GqlResponse {
        body: {
          data: {
            removeUser: boolean;
          };
        };
      }
      const removeMutation = `
                            mutation{
                              removeUser(id : "${String(_id)}")
                            }
                         `;

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query: removeMutation });

      expect((res as GqlResponse).body.data.removeUser).toBeTruthy();
    });
  });
});
