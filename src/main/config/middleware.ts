import bodyParser from "body-parser";
import { Application } from "express";

export const setupMiddleware = (app: Application) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}