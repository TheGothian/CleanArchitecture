import { IGetUsersUseCase } from "@application/interfaces/useCases/users/IGetUsersUseCase";
import { ok } from "../helpers/httpResponseHelper";
import { HttpRequest } from "../interfaces/HttpRequest";
import { HttpResponse } from "../interfaces/HttpResponse";
import { BaseController } from "./baseController";

export class GetUserController extends BaseController {

    constructor(private getUserUseCase: IGetUsersUseCase) {
        super();
    }

    async execute(httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<any>> {

        const userIdArray: string[] = [];
        const result = await this.getUserUseCase.execute(userIdArray);

        return ok(result)
    }
}