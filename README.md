# InsurEasier : `Server`

**All Insurane Made Easier**

InsurEasier is an application that intends to ease the life for both insurance seekers and providers by bringing them together on a common interactive platform.

URL: _http://insureasier.com_

It provides options for:

`This section needs to be updated`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

This being a GUI application it needs to be compiled before it can be run.

- Get the pre-requisites done
- Open a new terminal window and CD to your workspace
- Clone this repo by executing `git clone git@github.com:insurEasier007/insurEasier_ReactStrap.git`

### Prerequisites

- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Install [Node JS](https://nodejs.org/en/)
- Install [yarn](https://yarnpkg.com/en/)
- Install [Postgress app](https://postgresapp.com/)
- Install [redis](https://redis.io/download)

Make sure that postgres is up and running and a user has been created to connect to it. It is also required to create a database with the same name as has been defined in the `ormconfig.json` file under `username` and `password` keys. Feel free to modify the `ormconfig.json` file based on your local username and password but keep the table name unchanged.

Ensure that redis server is up and running.

### Installing

- Open a new terminal and CD to your cloned repo
- Execute `yarn install` on the terminal
- Execute `yarn start` to get the build dependencies
- Check that there are no errors on the terminal
- Server will start at `http://localhost:4000/graphql`

This URL is a Graphql playground that can be used to verify the functionalities provided by the server side implementation. Client application would be required to connect to this URL for serving data on the GUI.

## Running the tests

Execute `yarn test` to execute the tests that are present in this application code base. Ensure that tests are present before executing the command or else an error would be generated.

## Deployment

`This section needs to be updated`

## Documentation

For validating the existing queries and mutations, a set of examples for reference can be accessed from [here](./docs/graphql-samples/).

`this section needs to be updated`

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/insurEasier007/insurEasier_ReactStrap/tags).

## Authors

- **Samir Prakash** - _Current work_ - [@samirprakash](https://github.com/samirprakash)

`This section needs to be updated`
