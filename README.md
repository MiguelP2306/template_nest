

<p align="center">
  The most complete  application to be able to keep track of each of your patients
</p>

## Description

  This application is made with nestJS, a Javascript framework with TypeScript.

  As an ORM, TypeORM is being used and as a MySQL database, for the documentation we use Swagger, README.md and Postman, for the tests we use Jest and we only do e2e testing.

## Installation

```bash
# yarn
$ yarn 

# npm
$ npm install

# pnpm
$ pnpm install
```

## Running the app

  To run the project it is necessary to have all the environment variables, for this we have an example of the environment variables in the file <strong>.env.example"</strong>.

  We have the following files for environment variables.

  ```bash
    # dev
    $ .dev.env

    # test
    $ .test.env

    # prod
    $ .env
  ```

  Just keep in mind the development <strong>"dev"</strong> and test <strong>"test"</strong> files

  Once you have the development environment variables file ready, we can execute the following commands to run the project (use a command of your choice).
```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

 is [MIT licensed](LICENSE).
