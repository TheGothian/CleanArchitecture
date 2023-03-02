import { Validation } from "../interfaces/Validation";

export abstract class FieldValidation implements Validation {
    constructor(protected readonly _fieldName: string) { }

    abstract validate(input: any): Error | null;

    get fieldName(): string {
        return this._fieldName;
    }

}