import logger from '@shared/Logger';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import path from 'path';
// import throng from 'throng';
import BaseRouter from './routes';

const cors = require('cors');

const {
  NODE_ENV, DATABASE_URL, LOCAL_DATABASE_URL,
} = process.env;

// const WORKERS = process.env.WEB_CONCURRENCY || 1;

const app = express();

// const startApp = () => {
const { BAD_REQUEST } = StatusCodes;

// Do usuniecia?
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let mainDirName;

if (NODE_ENV === 'development') {
  // Show routes called in console during development
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
  // logging: NODE_ENV === 'development',
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
  app.use('/api', BaseRouter);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  });

  if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
}).catch((error) => console.log('TypeORM connection error: ', error));
// };

// if (NODE_ENV === 'development') {
//   startApp();
// } else {
//   throng(WORKERS, startApp);
// }

export default app;
