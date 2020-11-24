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
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
}
const ormConfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    University,
  ],
  migrations: [
    'src/migration/*.*',
  ],
  subscribers: [
    'src/subscriber/*.*',
  ],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
createConnection(ormConfig as any).then(async (connection) => {
  // app.get('/university/:name', (req: Request, res: Response) => {
  //   const { name } = req.params;
  //   const newUniversity = new University({ name });
  //   console.log('fruitssssssssssssssssssssssssss', name);
  //   connection.manager
  //     .save(newUniversity)
  //     .then((result) => res.status(200).json({ czyDotarlo: result }));

  // Add APIs
  // app.use('/api', BaseRouter);

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

  // const viewsDir = path.join(__dirname, 'views');
  // app.set('views', viewsDir);
  // const staticDir = path.join(__dirname, 'public');
  // app.use(express.static(staticDir));
  // app.get('*', (req: Request, res: Response) => {
  //     res.sendFile('index.html', {root: viewsDir});
  // });

  // app.use(express.static(path.join(__dirname, 'client', 'build')));
  // app.use('*', (req: Request, res: Response) => {
  //   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  //   // res.sendFile(path.join(__dirname, '../client/build/index.html'));
  //   // res.sendFile('index.html', {root: path.join(__dirname, 'client/build ')});
  // });

  // https://www.youtube.com/watch?v=xgvLP3f2Y7k&list=LL&index=1
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
