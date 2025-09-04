import express, { Application, Request, Response } from 'express';

import { PORT } from "./config/env";

//----

const app: Application = express();


import morgan from 'morgan';
app.use(morgan('dev'));




app.use((_req: Request, _res: Response) => {
    _res.status(200).json({ message: "Endpoint  found" })
})

app.set('port', PORT || 3000);

export default app;