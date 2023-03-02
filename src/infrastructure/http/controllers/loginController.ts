import { ILoginUseCase } from "@application/interfaces/useCases/authentication/ILoginUseCase";
import { BINDINGS } from "@infrastructure/loaders/bindings";
import { inject, injectable } from "inversify";
import { HttpRequest } from "../interfaces/HttpRequest";
import { HttpResponse } from "../interfaces/HttpResponse";
import { BodyParamValidationComposite } from "../validators/bodyParamValidationComposite";
import { BaseController } from "./baseController";

@injectable()
export class LoginController extends BaseController {
    useCase: ILoginUseCase;

    constructor(
        @inject(BINDINGS.LoginParamValidator) BodyParamValidationCompositeFactory: (name: string) => BodyParamValidationComposite,
        @inject(BINDINGS.LoginUseCase) useCase: ILoginUseCase
    ) {
        super(BodyParamValidationCompositeFactory("login"));
        this.useCase = useCase;
    }

    async execute(httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<any>> {
        const authenticationCredentials = httpRequest.body;
        try {
            const response = await this.useCase.execute(authenticationCredentials);
            console.log(this.useCase)

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