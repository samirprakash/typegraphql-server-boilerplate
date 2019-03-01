import faker from "faker";
import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import testConnection from "../../../utils/test/connection";
import gCall from "../../../utils/test/gCall";

let connection: Connection;

beforeAll(async done => {
  connection = await testConnection();
  done();
});

afterAll(async done => {
  await connection.close();
  done();
});

const loginQuery = `
query Login($data: LoginInput!) {
  login(data: $data) {
    id
    name
    username
    firstName
    lastName
    confirmed
  }
}`;

describe("User login process :", () => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  it("should be able to get the registered user", async () => {
    await User.create(user).save();

    try {
      await gCall({
        source: loginQuery,
        variableValues: {
          data: {
            email: user.email,
            password: user.password,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
});
