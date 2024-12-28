import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BlogRoutes } from './app/modules/blog/blog.route';
import { AuthRoutes } from './app/modules/Auth/auth.routes';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();

// parser
app.use(express.json());

app.use(cors());

// routes related to auths
app.use('/api', UserRoutes)
app.use('/api', BlogRoutes)
app.use('/api', AuthRoutes)

// root routes for for app api
app.get('/', (req: Request, res: Response) => {
  res.send(
    {
      status: true,
      message: "Welcome to blog app. API V.0.1 🔥",
    }
  );
});

// 404 handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
      success: false,
      message: "Route not found",
  });
});


export default app;
