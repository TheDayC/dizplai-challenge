# Dizplai Challenge
The programming challenge for Dizplai.

## Quick Start

Before running any of the following commands it's recommended that you have [Volta](https://docs.volta.sh/guide/getting-started) installed to manage your Node versions per application and for you to run `npm install` before any other NPM script. To run this application in a containerised format run the docker command:

```bash
npm run docker
```

## Development

Please refer to the application READMEs for the [UI](./ui/README.md) and [API](./api/README.md) to boot these applications in development mode. Both applications have hot reload and some linting / code formatting protection on staged files.

## Accomplishments

The requested tasks have been accomplished to the following standard:

1. A form on the HomePage (index) that gets a poll, submits a chosen option to a PostgreSQL database and fetches the votes for that poll.
2. Both the API and UI are fully tested.
3. Styling roughly matches that of the images provided and is responsive.
4. Polls are capable of handling as many options as required.

## Tech Stack

### UI

The UI is built with React, Typescript, Vite, MUI, TanStack Query, React Hook Form, React Router and Zod. React, TS, Vite and React Router buid the foundation of the application. TanStack Query allows us to avoid useEffect listeners when fetching data and avoid bugs that typically stem from this area. React Hook Form is a clean way to handle form submissions, their validation and type checking. Finally, Zod allows me to type check the code base and protect against unwanted type assumptions or incoming data that we're not expecting.

### API

The API is built on Node, ExpressJS, Typescript, cors, Winston and Zod. Node, ExpressJS and Typescript make up the core functionality of the REST API allows us to serve data to requests made by the UI or other services like Postman, Insomnia etc. cors simply opens up API to outside application requests, this would obviously be done in a more controlled manner in a production application. Winston is a logger that allows for tracing and debugging within the API, logging to both the terminal and local files. Finally, Zod also type checks this code base in a similar manner to the UI.

### Database

A PostgreSQL database with a Prisma connector in the API that allows for simple nested object queries, a seed file and a definition structure.

## Lessons Learnt / What I'd Do Differently.

Overall I'm happy with the application delivered. The tech is straight forward but is chosen to save time and to launch the application rather than provide structure. The UI, API and DB are in a good place.

I felt I spent too much time testing, not reading the comment fully and missing the point about avoiding testing the whole code base, so some improvement to be had there. I'd like to structure the database setup a touch better as well as even though it runs and connects it isn't seperated fully from the rest of the stack and there isn't a command to launch it solo.