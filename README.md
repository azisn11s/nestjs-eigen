# Eigen - Backend

## Description

This is my first experience to using NestJS (NodeJS Framework) and so excited. At a glance, I came from PHP environment, and want to move into one of cutting edge tech stack like NodeJS for daily using.

## Preparing database PostgreSQL

```bash
1. create postgre database with named nestjs_eigen
2. copy .env-example into .env
3. update DATABASE_URL value on .env file
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development - watch mode
$ npm run start:dev
# project running on port 3333
```
## Schema Migration using Prisma

```bash
$ npx prisma migrate dev
```

## Seed

```bash
$ npx prisma db seed
```

## Login
### I attached auth capabilities on this project. So, you need to login at first to try the other API's.
```bash
endpoint `auth/signin`
msisdn : 6285794313257
password :  password
```

## Swagger Docs
```bash 
https://app.swaggerhub.com/apis/azisn11s/Eigen/1.0.0
```
## License

Nest is [MIT licensed](LICENSE).
