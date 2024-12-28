export type Environment = 'dev' | 'prod' | 'test';

export const enviroments: Record<Environment, string> = {
  dev: '.dev.env',
  prod: '.env',
  test: '.test.env',
};
