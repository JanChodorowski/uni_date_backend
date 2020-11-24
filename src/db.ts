// import * as PostgressConnectionStringParser from 'pg-connection-string';

import ormConfig from 'ormConfig';
import { ConnectionOptions, createConnection, Connection } from 'typeorm';

// const databaseUrl = process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL;
// if (databaseUrl) {
//   const connectionOptions: any = PostgressConnectionStringParser.parse(databaseUrl);
//   const typeOrmOptions /*PostgresConnectionOptions*/ = {
//     type: 'postgres',
//     name: connectionOptions.name,
//     host: connectionOptions.host,
//     port: connectionOptions.port,
//     username: connectionOptions.username,
//     password: connectionOptions.password,
//     database: connectionOptions.database,
//     synchronize: true,
//     entities: ['target/entity/**/*.js'],
//     extra: {
//       ssl: true,
//     },
//   };
//   const connection = createConnection(typeOrmOptions);
// }
// const typeOrmOptions: ConnectionOptions = {
//   type: 'postgres',
//   url: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
//   synchronize: true,
//   logging: false,
//   entities: [
//     'src/entities/**/*.ts',
//   ],
//   migrations: [
//     'src/migration/**/*.ts',
//   ],
//   subscribers: [
//     'src/subscriber/**/*.ts',
//   ],
//   cli: {
//     entitiesDir: 'src/entities',
//     migrationsDir: 'src/migration',
//     subscribersDir: 'src/subscriber',
//   },
// };
// let db = createConnection(
//   {
//     type: 'postgres',
//     url: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
//     synchronize: true,
//     logging: false,
//     entities: [
//       'src/entities/**/*.ts',
//     ],
//     migrations: [
//       'src/migration/**/*.ts',
//     ],
//     subscribers: [
//       'src/subscriber/**/*.ts',
//     ],
//     cli: {
//       entitiesDir: 'src/entities',
//       migrationsDir: 'src/migration',
//       subscribersDir: 'src/subscriber',
//     },
//   },
// ).then(async (connection) => {
//   // do whatever you want with connection and use await if you want since its an async function
// }).catch((error: Error) => console.log(error));

// const initDb = async () => {
//   await createConnection({
//     type: 'postgres',
//     url: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
//     synchronize: true,
//     logging: false,
//     entities: [
//       'src/entities/**/*.ts',
//     ],
//     migrations: [
//       'src/migration/**/*.ts',
//     ],
//     subscribers: [
//       'src/subscriber/**/*.ts',
//     ],
//     cli: {
//       entitiesDir: 'src/entities',
//       migrationsDir: 'src/migration',
//       subscribersDir: 'src/subscriber',
//     },
//   });
// };

// initDb();

const db = async () => createConnection(ormConfig as any);
export default db;
