import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { testModule, usePipes } from './test.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await testModule.compile();

    app = moduleFixture.createNestApplication();
    usePipes(app)
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('(POST) /auth/login', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'miguelveperez54@gmail.com',
        password: 'Qwerty1$',
      })
      .expect(201)
      .expect('Content-Type', /json/)
      .then((response) => {
        const { access_token, user } = response.body;

        expect(access_token).toEqual(expect.any(String));

        expect(user).toEqual({
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            deleteAt: null,
            id: expect.any(Number),
            firstName: expect.any(String),
            lastName: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
          },
        );
      });
  });
});
