# Polls API

A Node application using a ExpressJS + Typescript stack featuring ESLint and Prettier for code linting and formatting.

Before running any of the following commands it's recommended that you have [Volta](https://docs.volta.sh/guide/getting-started) installed to manage your Node versions per application and for you to run `npm install` before any other NPM script.

## Database Setup

In the parent directory ensure the database container is up and running:

```bash
# cd ../ if required
npm run docker
```

For connection via the API's Prisma dependency you will need to copy the contents of `.env.example` to a new `.env` file then replace the square bracket values with the the appropriate ones found in the docker-compose.yml. When creating `.env` notice that there is a choice between protocols, `localhost` is for development, `host.docker.internal` is for building the docker containers and have them all interact with each other.

_**Note:** This process is bad practice and these values would normally be stored in a secret manager but, for the sake of speed and the lack of data sensitivity for this challenge I've left them freely available._

When the database is up and running you may want to halt the API and UI containers during development. When you're happy with the development set up you can execute the database initialisation script in this directory. This runs the prisma generate command and the prisma migration commands:

```bash
npm run prisma:init
```

(Optional) You can seed the database with the seed script in the future. This script will automatically run as part of the prisma:init script:

```bash
npm run prisma:seed
```

## Development

To run this application in development mode simply run the following command in your terminal:

```bash
npm run dev
```

## Production Build

To build this application for production run:

```bash
npm run build
```

To view the production build run:

```bash
npm run start
```

## Testing

Testing is done via Jest and MSW in order to mock requests to the endpoints.

To test the system once run:

```bash
npm run test
```

To test the system in watch mode while developing run:

```bash
npm run test:watch
```

## Endpoints

There are a variety of endpoints that can be accessed in this API, I've detailed these in the [API.md](./API.md) file.