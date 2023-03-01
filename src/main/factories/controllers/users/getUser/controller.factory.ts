import { BaseController } from "@infrastructure/http/controllers/baseController";
import { GetUserController } from "@infrastructure/http/controllers/getUserController";
import { createGetUserUseCase } from "@main/factories/userCases/authentication/users/users.factory";

export const createUserController = (): BaseController => {
    const useCase = createGetUserUseCase()
    return new GetUserController(useCase);
}