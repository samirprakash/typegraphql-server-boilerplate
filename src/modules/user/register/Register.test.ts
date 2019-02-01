import bcrypt from "bcryptjs";
import faker from "faker";
import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import testConnection from "../../../utils/test/connection";
import gCall from "../../../utils/test/gCall";

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
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
  let response: any;
  let dbUser: User | undefined;
  let userWithExistingParams = {};

  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  it("should be able to create a user", async () => {
    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    });

    expect(response.data!.register).toMatchObject({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      name: user.firstName + " " + user.lastName,
      confirmed: false
    });
  });

  it("should ensure that user has been created", async () => {
    dbUser = await User.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
  });

  it("should have same first name as was provided in the registration process", () => {
    expect(dbUser!.firstName).toBe(user.firstName);
  });

  it("should have same last name as was provided in the registration process", () => {
    expect(dbUser!.lastName).toBe(user.lastName);
  });

  it("should have same email as was provided in the registration process", () => {
    expect(dbUser!.email).toBe(user.email);
  });

  it("should have same password as was provided in the registration process", () => {
    expect(bcrypt.compare(dbUser!.password, user.password)).toBeTruthy();
  });

  it("should ensure that the created user is not a confirmed user", () => {
    expect(dbUser!.confirmed).toBeFalsy();
  });

  it("should create another user with an existing first name", async () => {
    userWithExistingParams = {
      firstName: user.firstName,
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data!.register.firstName).toBe(user.firstName);
  });

  it("should create another user with an existing last name", async () => {
    userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: user.lastName,
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data!.register.lastName).toBe(user.lastName);
  });

  it("should not create another user with an exisitng email", async () => {
    userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: user.email,
      password: faker.internet.password()
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data).toBeFalsy();
  });

  it("should not create a user with first name as empty", async () => {
    userWithExistingParams = {
      firstName: "",
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data).toBeFalsy();
  });

  it("should not create a user with first name having more than 16 characters", async () => {
    userWithExistingParams = {
      firstName: "testusertestusertestiusertestusertestuser", // length = 20
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data).toBeFalsy();
  });

  it("should not create a user with first name having anything other than alphabets", async () => {
    userWithExistingParams = {
      firstName: "testuser1",
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data).toBeFalsy();
  });

  it("should not create a user with last name as empty", async () => {
    userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: "",
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data).toBeFalsy();
  });

  it("should not create a user with last name having more then 16 characters", async () => {
    userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: "testusertestusertestiusertestusertestuser", // length = 20
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data).toBeFalsy();
  });

  it("should not create a user with last name having anything other than alphabets", async () => {
    userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: "testuser1",
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data).toBeFalsy();
  });

  it("should not create a user with password having less then 6 characters", async () => {
    userWithExistingParams = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: "12345" // length < 6
    };

    response = await gCall({
      source: registerMutation,
      variableValues: {
        data: userWithExistingParams
      }
    });

    expect(response.data).toBeFalsy();
  });
});
