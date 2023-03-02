import { MissingParamError } from "../errors/missingParamError";
import { FieldValidation } from "./fieldValidation";

export class RequiredFieldValidation extends FieldValidation {
    constructor(
        fieldName: string,
    ) { super(fieldName) }

    validate(input: any): Error | null {
        if (!input[this._fieldName]) {
            return new MissingParamError(this._fieldName);
        }
        return null;
    }
}
