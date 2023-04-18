import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import handlerData from './routes/data.routes.js';

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(handlerData)

export default app;