import { HttpRequest } from "@infrastructure/http/interfaces/HttpRequest";
import { BaseMiddleware } from "@infrastructure/http/middleware/baseMiddleware";
import { container } from "@infrastructure/loaders/diContainer";
import { NextFunction, Request, Response } from "express";
import { interfaces } from "inversify";

export default (
    baseMiddlewareConstructor: interfaces.Newable<BaseMiddleware>,
) => async (req: Request, res: Response, next: NextFunction) => {

    const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        userId: req.userId,
    };

    const baseMiddleware: BaseMiddleware = container.resolve(baseMiddlewareConstructor);

    try {
        const httpResponse = await baseMiddleware.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            Object.assign(req, httpResponse.body);
            next();
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body?.message,
            });
        }
    } catch (error) {
        res.status(500).json("Unexpected error occurred");
    }
}