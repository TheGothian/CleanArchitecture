
import { setupDI } from "@infrastructure/loaders/diContainer";
import express, { Express } from "express";
import { setupMiddleware } from "./middleware";
import { setupRoutes } from "./routes";


export default (): Express => {
  const app = express();
  setupDI();
  setupMiddleware(app);
  setupRoutes(app);
  return app;
};
