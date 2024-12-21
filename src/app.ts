import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// parser
app.use(express.json());

app.use(cors());

// routes related to 

// root routes for for app api
app.get('/', (req: Request, res: Response) => {
  res.send(
    {
      status: true,
      message: "Welcome to [] app. API V.0.1 🔥",
    }
  );
});

export default app;
