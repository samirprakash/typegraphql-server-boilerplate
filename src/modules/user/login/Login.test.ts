import { Connection } from "typeorm";
import testConnection from "../../../utils/test/connection";

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

describe("User login process :", () => {
  it("should have a registered user exisitng in the database", async () => {
    console.log("Testing Login flow");
  });
});
