import { ILoginUseCase } from "@application/interfaces/useCases/authentication/ILoginUseCase";
import { HttpRequest } from "../interfaces/HttpRequest";
import { HttpResponse } from "../interfaces/HttpResponse";
import { BodyParamValidationComposite } from "../validators/bodyParamValidationComposite";
import { BaseController } from "./baseController";

export class LoginController extends BaseController {

    useCase: ILoginUseCase;
    constructor(validator: BodyParamValidationComposite, useCase: ILoginUseCase) {
        super(validator);
        this.useCase = useCase;
    }

    async execute(httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<any>> {
        console.log(httpRequest.body)
        const authenticationCredentials = httpRequest.body;
        try {
            const response = await this.useCase.execute(authenticationCredentials);

            const httpResponse: HttpResponse<string> = {
                statusCode: 200,
                body: response
            }

            return httpResponse;

        } catch (error) {
            const err = error as Error;
            return {
                statusCode: 500,
                body: { error: err.message }
            } as HttpResponse
        }
    }
}