import * as request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createTestApp } from '../../utils/create-app';
import { GqlBadRequestErrorResponse } from '../../utils/interfaces';
import { loginRoute } from '../../utils/constants';

describe('Validation Pipes', () => {
  let app: NestExpressApplication;
  beforeAll(async () => {
    app = await createTestApp({ useCsrf: false });
  });

  it('it should return status code 200 with correct credentials, even if unknown fields are present(like hacker).', async () => {
    const res = await request(app.getHttpServer()).post(loginRoute).send({
      email: 'testing@example.com',
      password: 'Test1234!',
      hacker: true,
    });

    expect(res.status).not.toBe(404);
  });

  it('should return a Rest error with validation details and ignore unknown fields (like hacker)', async () => {
    const response = await request(app.getHttpServer())
      .post(loginRoute)
      .send({ email: 'jasanz@gmail.com', password: 'JoseAlejo', hacker: true })
      .expect(400);

    const error = response.body as GqlBadRequestErrorResponse['extensions'];

    expect(error.statusCode).toBe(400);
    expect(error.responseData?.message.length).toBe(1);
    expect(error.responseData?.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'password' }),
        expect.not.objectContaining({ field: 'hacker' }),
      ]),
    );
  });

  it('should return a GraphQL error with validation details when the createUser input has invalid fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
              mutation {
                createUser(input: {
                   name: "Jo",
                   username: "ja",
                  email: "jasanaszexample.com",
                   password: "Jasanz123",
                  confirmPassword: "Jasanz@.123"
                }) {
                  name
               }
              }
              `,
      })
      .expect(200);

    const { errors } = response.body as {
      errors: Array<GqlBadRequestErrorResponse>;
    };

    expect(errors).toBeDefined();
    expect(errors.length).toBeGreaterThan(0);

    const { message, extensions } = errors[0];

    expect(message).toEqual('Validation Error');
    expect(extensions.error).toEqual('Bad Request');
    expect(extensions.statusCode).toBe(400);

    const responseData = extensions.responseData;

    expect(responseData).toBeDefined();
    expect(responseData?.message.length).toBe(5);
    expect(responseData?.message).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'name' }),
        expect.objectContaining({ field: 'username' }),
        expect.objectContaining({ field: 'email' }),
        expect.objectContaining({ field: 'password' }),
        expect.objectContaining({ field: 'confirmPassword' }),
      ]),
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
