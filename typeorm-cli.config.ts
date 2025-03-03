import { DataSource } from "typeorm";

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'movies-db',
  port: 3306,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
});