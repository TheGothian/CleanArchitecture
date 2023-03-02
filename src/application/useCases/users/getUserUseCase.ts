import { IUserRepository, Query } from "@application/interfaces/repositories/IUser.repository";
import { IGetUsersUseCase } from "@application/interfaces/useCases/users/IGetUsersUseCase";
import { User } from "@domain/entities/user";
import { BINDINGS } from "@infrastructure/loaders/bindings";
import { inject, injectable } from "inversify";

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {

    constructor(
        @inject(BINDINGS.UserRepository) private userRepo: IUserRepository
    ) { }

    async execute(userIdArray: string[]): Promise<User[]> {

        const query: Query<User> = {
        }
        const users = await this.userRepo.getAll(query);

        return users;
    }

}