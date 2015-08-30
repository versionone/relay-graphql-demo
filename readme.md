# React, Relay, GraphQL Starter Project

## Getting started

```shell
npm install # install necessary dependencies
```

### Running Site for Production

This will build the site and run the web and GraphQL server forever until stopped.

```shell
npm start # starts server in production mode

# ---
npm run stop # stops production mode
```

### Developing Site

This will build the site and setup hot loading for the server, GraphQL schema, GraphQL server changes, and client-side react components.

```shell
npm run watch
```

### Other Relevant Tasks

```shell
npm test # run all specs
npm test grepPattern # only run the specs matching pattern
npm run test:debug # run specs for debugging

npm run lint #lint build, tests, and source files
npm run lint:watch #lint and watch build, tests, and source files
```

## Technology Stack

Hot loading is available for React components, server updates, and GraphQL schema changes. Front-end, server, and specs are written in es2015+.

- Front-end
	- react
	- react-router
	- relay
- Server
	- graphql
	- koa
- Build
	- babel
	- webpack
	- eslint
- Tests
	- karma, phantomjs, chrome
	- mocha, sinon, chai