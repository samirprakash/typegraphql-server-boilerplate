import { Connection } from "typeorm";
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
  }
}
`;

describe("Registration work flow for insurEasier", () => {
  it("should be able to create a user", async () => {
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: "bob",
            lastName: "bob2",
            email: "bob@bob.com",
            password: "adadaddadada"
          }
        }
      })
    );
  });
});
