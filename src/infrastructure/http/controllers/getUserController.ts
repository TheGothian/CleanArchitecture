import { IGetUsersUseCase } from "@application/interfaces/useCases/users/IGetUsersUseCase";
import { BINDINGS } from "@infrastructure/loaders/bindings";
import { inject, injectable } from "inversify";
import { ok } from "../helpers/httpResponseHelper";
import { HttpRequest } from "../interfaces/HttpRequest";
import { HttpResponse } from "../interfaces/HttpResponse";
import { BaseController } from "./baseController";

@injectable()
export class GetUserController extends BaseController {

    constructor(
        @inject(BINDINGS.GetUsersUseCase) private getUserUseCase: IGetUsersUseCase
    ) {
        super();
    }

    async execute(httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<any>> {

        const userIdArray: string[] = [];
        const result = await this.getUserUseCase.execute(userIdArray);

        return ok(result)
    }
}