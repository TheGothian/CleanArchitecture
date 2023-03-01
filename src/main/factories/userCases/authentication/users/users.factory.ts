import { IGetUsersUseCase } from "@application/interfaces/useCases/users/IGetUsersUseCase";
import { GetUsersUseCase } from "@application/useCases/users/getUserUseCase";
import { UserRepository } from "@infrastructure/db/mongodb/repositories";

export const createGetUserUseCase = (): IGetUsersUseCase => {
    const userRepo = new UserRepository();
    return new GetUsersUseCase(userRepo);
}