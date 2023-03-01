import authenticationRoutes from '@main/routes/authentication.routes';
import userRoutes from '@main/routes/user.routes';
import { Express, Router } from 'express';

export const setupRoutes = (app: Express) => {
    const router = Router();

    authenticationRoutes(router);
    userRoutes(router);

    app.use(router);
} 