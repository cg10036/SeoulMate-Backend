import "reflect-metadata";
import { DataSource } from "typeorm";
import { Event } from "./entities/Event";
import dbConfig from "./configs/db.config";
import { Comment } from "./entities/Comment";

export const AppDataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: true,
  entities: [Event, Comment],
  migrations: [],
  subscribers: [],
  ...dbConfig,
});
