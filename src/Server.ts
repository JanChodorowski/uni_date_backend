import University from '@entities/University';
import logger from '@shared/Logger';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import morgan from 'morgan';
import 'reflect-metadata';
import {
  ConnectionOptions, createConnection, Connection, getConnection,
} from 'typeorm';
// import UniversityDao from 'daos/University/UniversityDao';
import User from '@entities/User';
// eslint-disable-next-line import/extensions
// import db from './db';
import BaseRouter from './routes';

const path = require('path');

console.log('__dirname', __dirname);
// console.log('ormConfig', ormConfig);
// const connection = async () => await createConnection(ormConfig as any);

// db().then(async (cnt) => {
//   const res = await cnt.manager.find(University).catch((err) => console.log(err));
//   console.log(res);
//   // .then((res) => console.log('hej', res));
// }).catch((error) => console.log(error));

// can be used once createConnection is called and is resolved
// const unii = getConnection().manager.find(University);

// console.log('dupa', process.env.DATABASE_URL, unii);

const app = express();
const { BAD_REQUEST } = StatusCodes;

/** **********************************************************************************
 *                              Set basic express settings
 ********************************************************************************** */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
const { NODE_ENV, DATABASE_URL, LOCAL_DATABASE_URL } = process.env;
let mainDirName;

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));

  mainDirName = 'src';
} else if (NODE_ENV === 'production') {
  // Security
  app.use(helmet({
    contentSecurityPolicy: false,
  }));

  mainDirName = 'dist';
}

const ormConfig = {
  type: 'postgres',
  url: DATABASE_URL || LOCAL_DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    `${mainDirName}/entities/*.*`,
  ],
  migrations: [
    `${mainDirName}/migration/*.*`,
  ],
  subscribers: [
    `${mainDirName}/subscriber/*.*`,
  ],
  cli: {
    entitiesDir: `${mainDirName}/entities`,
    migrationsDir: `${mainDirName}/migration`,
    subscribersDir: `${mainDirName}/subscriber`,
  },
};
createConnection(ormConfig as any).then(async (connection) => {
  app.get('/university/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const newUniversity = new University({ name });
    console.log('fruitssssssssssssssssssssssssss', name);
    connection.manager
      .save(newUniversity)
      .then((result) => res.status(200).json({ czyDotarlo: result }));
  });

  // Add APIs
  app.use('/api', BaseRouter);

  // Print API errors
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  });

  /** **********************************************************************************
 *                              Serve front-end content
 ********************************************************************************** */

  // if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
// }
}).catch((error) => console.log('TypeORM connection error: ', error));
// Export express instance
export default app;
