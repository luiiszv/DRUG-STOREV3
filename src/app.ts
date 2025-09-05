import express, { Application, Request, Response } from 'express';
import { errorHandler } from "./core/errors/errorHandler";
import { PORT } from "./config/env";

//----

const app: Application = express();


import morgan from 'morgan';
app.use(morgan('dev'));




app.use((_req: Request, _res: Response) => {
    _res.status(200).json({ message: "Endpoint  found" })
})


app.use(errorHandler);
app.set('port', PORT || 3000);

export default app;