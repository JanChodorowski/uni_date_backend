"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("@shared/Logger"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const helmet_1 = __importDefault(require("helmet"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
console.log('dupa', process.env.DATABASE_URL);
const app = express_1.default();
const { BAD_REQUEST } = http_status_codes_1.default;
// https://www.youtube.com/watch?v=xgvLP3f2Y7k&list=LL&index=1
const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://uni-dating-server.herokuapp.com'];
const corsOptions = {
    origin: function (origin, callback) {
        console.log("** Origin of request " + origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log("Origin acceptable");
            callback(null, true);
        }
        else {
            console.log("Origin rejected");
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use(cors_1.default(corsOptions));
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet_1.default());
}
const { Pool, Client } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
    sslmode: process.env.NODE_ENV === "production" ? "require" : "disable"
    // ssl: process.env.DATABASE_URL ? true : false
});
app.get('/university/:name', (req, res) => {
    const name = req.params.name;
    console.log('fruitssssssssssssssssssssssssss', name);
    pool.query('INSERT INTO university(name) VALUES($1);', [name], (err, results) => {
        if (err) {
            throw err;
        }
        console.log('before rowwwwwwwwwwwwwwww');
        for (let row of results.rows) {
            console.log('rowwwwwwwwww', JSON.stringify(row));
        }
        res.status(200).json({ czyDotarlo: 'no dotarlo' });
    });
});
app.post('/university', (req, res) => {
    const name = req.body.name;
    console.log('fruitssssssssssssssssssssssssss', name);
    pool.query('INSERT INTO university(name) VALUES($1);', [name], (err, results) => {
        if (err) {
            throw err;
        }
        console.log('before rowwwwwwwwwwwwwwww');
        for (let row of results.rows) {
            console.log('rowwwwwwwwww', JSON.stringify(row));
        }
        res.status(200).json({ czyDotarlo: 'no dotarlo' });
    });
});
// Add APIs
app.use('/api', routes_1.default);
// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    Logger_1.default.err(err, true);
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
// app.use(express.static(path.join(__dirname, 'client', 'build')));
// app.use('*', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   // res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   // res.sendFile('index.html', {root: path.join(__dirname, 'client/build ')});
// });
// https://www.youtube.com/watch?v=xgvLP3f2Y7k&list=LL&index=1
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express_1.default.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}
// Export express instance
exports.default = app;
