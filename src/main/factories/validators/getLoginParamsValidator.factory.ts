import { BodyParamValidationComposite } from "@infrastructure/http/validators/bodyParamValidationComposite"
import { RequiredFieldValidation } from "@infrastructure/http/validators/requiredFieldValidation"

export const createLoginParamsValidator = () => {
    return new BodyParamValidationComposite([
        new RequiredFieldValidation("password"),
        new RequiredFieldValidation("username"),
    ])
}