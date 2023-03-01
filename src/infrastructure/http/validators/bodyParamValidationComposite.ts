import { HttpRequest } from "../interfaces/HttpRequest";
import { Validation } from "../interfaces/Validation";
import { RequiredFieldValidation } from "./requiredFieldValidation";

export class BodyParamValidationComposite implements Validation {
    private sanitizedBody?: any;
    constructor(private validators: RequiredFieldValidation[]) { }

    validate(input: unknown): Error | null {
        const paramInput = input as HttpRequest;
        const body = paramInput.body;
        this.sanitizedBody = {}

        for (const validator of this.validators) {
            const result = validator.validate(paramInput.body);
            if (result === null) {
                const bodyFiledValue = body[validator.fieldName];

                this.sanitizedBody = { ...this.sanitizedBody, [validator.fieldName]: bodyFiledValue }
            }
            else {
                return result;
            }
        }

        return null;
    }

    getSanitizedBody() {
        return this.sanitizedBody;
    }
}