import { HttpRequest } from "@infrastructure/http/interfaces/HttpRequest";
import { BaseMiddleware } from "@infrastructure/http/middleware/baseMiddleware";
import { NextFunction, Request, Response } from "express";

export default (baseMiddleware: BaseMiddleware) => async (req: Request, res: Response, next: NextFunction) => {

    const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        userId: req.userId,
    };

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