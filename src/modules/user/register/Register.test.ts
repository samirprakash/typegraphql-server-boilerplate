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

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(data: $data) {
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
    password: faker.internet.password(),
  };

  it("should be able to create a user", async () => {
    await expect(
      gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
          },
        },
      }),
    ).resolves.toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          confirmed: false,
        },
      },
    });

    const dbUser = await User.findOne({ where: { email: user.email } });
    await expect(dbUser).toBeDefined();
    await expect(
      await bcrypt.compare(user.password, dbUser!.password),
    ).toBeTruthy();
  });

  it("should create another user with an existing first name", async () => {
    const userWithExistingParams = {
      firstName: user.firstName,
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await expect(
      User.create(userWithExistingParams).save(),
    ).resolves.toBeDefined();
  });

  it("should create another user with an existing last name", async () => {
    const userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: user.lastName,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await expect(
      User.create(userWithExistingParams).save(),
    ).resolves.toBeDefined();
  });

  it("should not create another user with an exisitng email", async () => {
    const userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: user.email,
      password: faker.internet.password(),
    };

    await expect(User.create(userWithExistingParams).save()).rejects;
  });

  it("should not create a user with first name as empty", async () => {
    const userWithExistingParams = {
      firstName: "",
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await expect(User.create(userWithExistingParams).save()).rejects;
  });

  it("should not create a user with first name having more than 16 characters", async () => {
    const userWithExistingParams = {
      firstName: "testusertestusertestiusertestusertestuser", // length = 20
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await expect(User.create(userWithExistingParams).save()).rejects;
  });

  it("should not create a user with first name having anything other than alphabets", async () => {
    const userWithExistingParams = {
      firstName: "testuser1",
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await expect(User.create(userWithExistingParams).save()).rejects;
  });

  it("should not create a user with last name as empty", async () => {
    const userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: "",
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await expect(User.create(userWithExistingParams).save()).rejects;
  });

  it("should not create a user with last name having more then 16 characters", async () => {
    const userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: "testusertestusertestiusertestusertestuser", // length = 20
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await expect(User.create(userWithExistingParams).save()).rejects;
  });

  it("should not create a user with last name having anything other than alphabets", async () => {
    const userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: "testuser1",
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await expect(User.create(userWithExistingParams).save()).rejects;
  });

  it("should not create a user with password having less then 6 characters", async () => {
    const userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "12345", // length < 6
    };

    await expect(User.create(userWithExistingParams).save()).rejects;
  });
});
