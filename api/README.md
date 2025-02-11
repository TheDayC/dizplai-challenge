# Polls API

A Node application using a ExpressJS + Typescript stack featuring ESLint and Prettier for code linting and formatting.

Before running any of the following commands it's recommended that you have [Volta](https://docs.volta.sh/guide/getting-started) installed to manage your Node versions per application and for you to run `npm install` before any other NPM script.

## Database Setup

In the parent directory ensure the database container is up and running:

```bash
# cd ../ if required
npm run docker
```

When the database is up and running you may want to halt the API and UI containers during development. When you're happy with the development set up you can execute the database initialisation script in this directory:

```bash
npm run prisma:init
```

Then seed the database with the seed script:

```bash
npm run prisma:seed
```

## Development

To run this application in development mode simply run the following command in your terminal:

```bash
npm run dev
```

# Production Build

To build this application for production run:

```bash
npm run build
```

To view the production build run:

```bash
npm run start
```