import { createConnection } from "typeorm";

const testConnection = (drop: boolean = false) => {
  return createConnection({
    name: "test",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "samirprakash",
    password: "admin",
    database: "test-server-boilerplate",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "../../entity/**/*.*"]
  });
};

export default testConnection;
