import { BaseController } from "@infrastructure/http/controllers/baseController";
import { LoginController } from "@infrastructure/http/controllers/loginController";
import { createLoginUserCase } from "@main/factories/userCases/authentication/login.factory";
import { createLoginParamsValidator } from "@main/factories/validators/getLoginParamsValidator.factory";


export const createLoginController = (): BaseController => {
    const useCase = createLoginUserCase();
    const bodyParamValidator = createLoginParamsValidator();
    return new LoginController(bodyParamValidator, useCase);
}