import { MissingParamError } from "../errors/missingParamError";
import { Validation } from "../interfaces/Validation";

export class RequiredFieldValidation implements Validation {
    constructor(
        public readonly fieldName: string,
    ) { }

    validate(input: any): Error | null {
        if (!input[this.fieldName]) {
            return new MissingParamError(this.fieldName);
        }
        return null;
    }
}
