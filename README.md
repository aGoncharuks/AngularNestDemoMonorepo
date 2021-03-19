# WiseGuy

## Workspace

This project was generated using [Nx](https://nx.dev) - a set of extensible Dev Tools for Monorepos.

#### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are core plugins used in this project:

- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

#### Generate a server side application

Run `nx g @nrwl/angular:app my-app` to generate an application.

When using Nx, you can create multiple applications and libraries in the same workspace.

#### Generate a library

Run `nx g @nrwl/angular:lib my-lib` to generate a library.

Libraries are sharable across libraries and applications. They can be imported from `@wise-guy/mylib`.

#### Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `nx g @nrwl/angular:component my-component --project=my-app` to generate a new component.

#### Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

#### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

#### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

#### Other workspace capabilities

Visit the [Nx Documentation](https://nx.dev) to learn more.

## Client 


## API

Project is using [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) to provide scalabale and fault tolerant API. 

API setup for new application includes the following steps:

1. Create new Elastic Beanstalk Web server environment for each environment: `qa`, `prod`. 
2. Use the following environment settings: 
-  `WiseguyUserApi-<env-name>` for environment name
-  `Node.js`(latest) for Plaftorm
-  `Sample application` for Application Code

## Database 

Project is using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - fully managed MongoDB cloud database service, deployed to AWS.

Database setup for new application includes the following steps:

1. Create an Organization in MongoDB Atlas
2. Create a project for each environment: `dev`, `qa`, `prod`
3. Create a Cluster under each environment, use the same name as for environment. Choose AWS as Cloud Provider.
4. Create a database `wiseguy`
5. Create the following collections: `bid`, `offer`
6. Configure network access to you database, allowing IP addresses of your backend machines.
7. Create a user called `api<env-name>` with `Read and write to any database` privileges for every environment.
8. Add corresponding configuration to client application (parameters starting with `MONGODB_`).