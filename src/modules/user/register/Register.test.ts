import { Connection } from "typeorm";
import testConnection from "../../../utils/test/connection";

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
});

afterAll(() => {
  connection.close();
});

describe("Registration work flow for insurEasier", () => {
  it("should be able to create a user", () => {
    console.log("User needs to be created!");
  });
});
