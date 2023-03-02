import { injectable } from "inversify";
import { badRequest, serverError } from "../helpers/httpResponseHelper";
import { HttpRequest } from "../interfaces/HttpRequest";
import { HttpResponse } from "../interfaces/HttpResponse";
import { BodyParamValidationComposite } from "../validators/bodyParamValidationComposite";

@injectable()
export abstract class BaseController {

    constructor(private validation?: BodyParamValidationComposite) {

    }

    abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation?.validate(httpRequest);
            if (error) {
                return badRequest(error);
            }

            httpRequest.body = this.validation?.getSanitizedBody() || httpRequest.body;
            console.log(httpRequest.body)
            return await this.execute(httpRequest);
        } catch (error) {
            console.log("validation Error");
            return serverError(error);
        }
    }
}