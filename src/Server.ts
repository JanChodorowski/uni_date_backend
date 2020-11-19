import logger from '@shared/Logger';
import cookieParser from 'cookie-parser';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import morgan from 'morgan';
import path from 'path';
import BaseRouter from './routes';
console.log('dupa',process.env.DATABASE_URL)


const app = express();
const { BAD_REQUEST } = StatusCodes;



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

interface IDbResponse extends Response{
    rows: any;
}

const { Pool, Client } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
    sslmode: process.env.NODE_ENV === "production" ? "require" : "disable"
    // ssl: process.env.DATABASE_URL ? true : false
})

  app.get('/university/:name', (req: Request, res: Response) => {
    const name = req.params.name
    console.log('fruitssssssssssssssssssssssssss',name)
    pool.query('INSERT INTO university(name) VALUES($1);', [name], (err: Error, results: any) => {
      if (err) {
        throw err
      }
      console.log('before rowwwwwwwwwwwwwwww')
      for (let row of results.rows) {
        console.log('rowwwwwwwwww', JSON.stringify(row));
      }
      res.status(200).json({czyDotarlo: 'no dotarlo'})
    })
  })

  app.post('/university', (req: Request, res: Response) => {
    const name = req.body.name
    console.log('fruitssssssssssssssssssssssssss',name)
    pool.query('INSERT INTO university(name) VALUES($1);', [name], (err: Error, results: any) => {
      if (err) {
        throw err
      }
      console.log('before rowwwwwwwwwwwwwwww')
      for (let row of results.rows) {
        console.log('rowwwwwwwwww', JSON.stringify(row));
      }
      res.status(200).json({czyDotarlo: 'no dotarlo'})
    })
  })

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



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));
// app.get('*', (req: Request, res: Response) => {
//     res.sendFile('index.html', {root: viewsDir});
// });

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
// Export express instance
export default app;
