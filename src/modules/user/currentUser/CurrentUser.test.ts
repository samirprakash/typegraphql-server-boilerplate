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

const currentUserQuery = `
{
  currentUser {
    id
    firstName
    lastName
    email
    name
    confirmed
  }
}
`;

describe("User registration process :", () => {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  it("should be able to get current user if the user is currently logged in", async () => {
    const dbUser = await User.create(user).save();
    await User.update(
      { id: parseInt(`${dbUser.id}`, 10) },
      { confirmed: true }
    );

    await expect(
      gCall({
        source: currentUserQuery,
        userId: dbUser.id
      })
    ).resolves.toMatchObject({
      data: {
        currentUser: {
          id: `${dbUser.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          confirmed: true
        }
      }
    });
  });

  it("should not be able to get current user if the user is not currently logged in", async () => {
    await expect(
      gCall({
        source: currentUserQuery
      })
    ).rejects;
  });
});
