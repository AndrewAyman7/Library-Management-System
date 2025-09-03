import express from 'express';
import apiRouter from './Web/Routes/LibraryRoutes';

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

export default app;
