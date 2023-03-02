import { IAuthenticationUseCase } from "@application/interfaces/useCases/authentication/IAuthenticationUseCase";
import { BINDINGS } from "@infrastructure/loaders/bindings";
import { inject, injectable } from "inversify";
import { InvalidAuthTokenError } from "../errors/InvalidAuthTokenError";
import { badRequest, forbidden, ok } from "../helpers/httpResponseHelper";
import { HttpRequest } from "../interfaces/HttpRequest";
import { HttpResponse } from "../interfaces/HttpResponse";
import { BaseMiddleware } from "./baseMiddleware";

@injectable()
export class AuthMiddleware extends BaseMiddleware {


    constructor(
        @inject(BINDINGS.AuthenticationUseCase) private useCase: IAuthenticationUseCase
    ) {
        super();
    }

    async execute(httpRequest: Request): Promise<Response> {
        const authorization = httpRequest.headers?.authorization;

        if (!authorization) {
            return forbidden(new InvalidAuthTokenError());
        }

        const bearerSplit = authorization.split(' ');

        if (bearerSplit.length !== 2) {
            return badRequest(new InvalidAuthTokenError);
        }

        if (bearerSplit[0] !== 'Bearer') {
            return badRequest(new InvalidAuthTokenError);
        }

        const user = await this.useCase.execute(bearerSplit[1]);

        if (!user) {
            return forbidden(new InvalidAuthTokenError);
        }


        return ok({ userId: user?.id })
    }
}





export type Request = HttpRequest<undefined, undefined, { authorization: string }>;
export type Response =
    HttpResponse<{ userId: string } | InvalidAuthTokenError>;
