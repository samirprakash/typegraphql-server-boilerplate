import bcrypt from "bcryptjs";
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

export const loginQuery = `
query Login($data: LoginInput!) {
  login(data: $data) {
    id
    name
    firstName
    lastName
    confirmed
  }
}`;

describe("User login process :", () => {
  it("should be able to get the registered user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password(), 12)
    };

    const response = await User.create(user).save();
    console.log(response);

    await gCall({
      source: loginQuery,
      variableValues: {
        data: {
          email: user.email,
          password: user.password
        }
      }
    }).then(response => {
      console.log(response.data);
    });
  });

  it("should find the user with the registered email", async () => {
    // await expect(User.findOne({ where: { email: user!.email } }));
  });
});
