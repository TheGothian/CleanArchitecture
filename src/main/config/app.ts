import setupRoutes from '@main/config/routes';
import express, { Express } from "express";


export default (): Express => {
  const app = express();
  setupRoutes(app);
  return app;
};
