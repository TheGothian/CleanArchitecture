import { BaseController } from "@infrastructure/http/controllers/baseController";
import { HttpRequest } from "@infrastructure/http/interfaces/HttpRequest";
import { Request, Response } from "express";


export default (baseController: BaseController) => async (req: Request, res: Response) => {

    const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        userId: req.userId,
    };

    try {
        const httpResponse = await baseController.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    } catch (error) {
        res.status(500).json("Unexpected error occurred");
    }
}