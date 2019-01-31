import { createConnection } from "typeorm";

const testConnection = async (drop: boolean = false) => {
  return await createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "samirprakash",
    password: "admin",
    database: "test-server-boilerplate",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../../entity/**/*.*"]
  });
};

export default testConnection;
