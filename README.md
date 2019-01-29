# InsurEasier : `Server`

**All Insurane Made Easier**

InsurEasier is an application that intends to ease the life for both insurance seekers and providers by bringing them together on a common interactive platform.

URL: _http://insureasier.com_

## Getting Started

- Get the pre-requisites done
- Open a new terminal window and CD to your workspace
- Clone this repo by executing `git clone git@github.com:insurEasier007/insurEasier_ReactStrap.git`

### Prerequisites

- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Install [Node JS](https://nodejs.org/en/)
- Install [yarn](https://yarnpkg.com/en/)
- Install [Postgress app](https://postgresapp.com/)
- Install [redis](https://redis.io/download)

Make sure that postgres is up and running. Look at [ormconfig](./ormconfig.json) and based on the values specified under default connection, create a user, password and database in postgres. if you want, you create your own username and password in postgres and update `ormconfig.json`.

After installing redis, execute `redis-server` in a standalone terminal to have redis running.

### Installing

- Open a new terminal and CD to your cloned repo
- Execute `yarn install` on the terminal
- Execute `yarn start` to get the build dependencies
- Check that there are no errors on the terminal
- Server will start at `http://localhost:4000/graphql`

> http://localhost:4000/graphql is the Graphql playground where we can test the server side implementation.

> Look [here](./docs/graphql-samples/) to checkout the examples for verifying our flows for login, registration, etc.

## Running the tests

Execute `yarn test` to execute the tests that are present in this application code base. Ensure that tests are present before executing the command or else an error would be generated.

## Deployment

`TBD`

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- [@samirprakash](https://github.com/samirprakash)
