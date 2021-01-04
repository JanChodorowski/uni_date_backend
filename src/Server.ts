import { University } from '@entities/University';
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
import jwt from 'jsonwebtoken';
import path from 'path';
import { authenticate } from '@middleware/middleware';
import BaseRouter from './routes';
import router from './routes/Picture';

const cors = require('cors');

const app = express();
const { BAD_REQUEST } = StatusCodes;
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Do usuniecia?
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const {
  NODE_ENV, DATABASE_URL, LOCAL_DATABASE_URL, TOKEN_SECRET,
} = process.env;

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
  // const io = require('socket.io')(app);
  // const users:any = {};
  // io.sockets.on('connection', (socket: any) => {
  //   socket.on('new', (data: any, callback:any) => {
  //     console.log(data.name);
  //     if (data in users) {
  //       callback(false);
  //     } else {
  //       callback(true);
  //       socket.name = data.name;
  //       users[socket.name] = socket;
  //     }
  //   });
  //   socket.on('msg', (data: any, callback:any) => {
  //     callback(data.msg);
  //     io.to(users[data.to].emit('priv', data.msg));
  //   });
  // });
  /* Craete an empty object to collect connected users */

  app.use('/api', BaseRouter);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  });

  // if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
// }
}).catch((error) => console.log('TypeORM connection error: ', error));
export default app;
