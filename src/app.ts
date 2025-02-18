require('dotenv').config();
import express, { Express } from 'express';
import morgan from 'morgan'; // Middlware to log requests
import helmet from 'helmet'; // Middleware to secure express apps adding HTTP response headers
import cors from 'cors'; // Middleware to enable cors
import bodyParser from 'body-parser'; // Middleware to parse body request
import { errorHandler } from './middlewares/error-handler';
import pingRouter from './routes/ping';
import itemRouter from './routes/item';
import swaggerDocRouter from './routes/swagger';
import ExpressMongoSanitize from 'express-mongo-sanitize'; // Middleware to prevent MongoDB injection attakc by operations.

const app: Express = express();

//#region use of Middlewares
app.use(bodyParser.json()); // parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // parse urlenconding bodies
app.use(helmet());
app.use(cors());
app.use(morgan('tiny')); // minimal logger output
app.use(ExpressMongoSanitize());
//#endregion Middlewares

//#region routes
app.use('/ping', pingRouter); // could be "/api/v1/ping"
app.use('/items', itemRouter); // could be "/api/v1/items"
app.use('/api-docs', swaggerDocRouter); // could be "/api/v1/docs"

//#endregion routes

app.use(errorHandler);

export default app;
