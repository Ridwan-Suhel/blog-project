import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './app/modules/user/user.route';
import { BlogRoutes } from './app/modules/blog/blog.route';
const app: Application = express();

// parser
app.use(express.json());

app.use(cors());

// routes related to auths
app.use('/api', AuthRoutes)
app.use('/api', BlogRoutes)

// root routes for for app api
app.get('/', (req: Request, res: Response) => {
  res.send(
    {
      status: true,
      message: "Welcome to blog app. API V.0.1 🔥",
    }
  );
});

export default app;
