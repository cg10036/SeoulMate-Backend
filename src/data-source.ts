import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import dbConfig from "./configs/db.config";

export const AppDataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
  ...dbConfig,
});
