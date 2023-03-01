import { IUserRepository, Query } from "@application/interfaces/repositories/IUser.repository";
import { IGetUsersUseCase } from "@application/interfaces/useCases/users/IGetUsersUseCase";
import { User } from "@domain/entities/user";

export class GetUsersUseCase implements IGetUsersUseCase {

    constructor(
        private userRepo: IUserRepository
    ) { }

    async execute(userIdArray: string[]): Promise<User[]> {

        const query: Query<User> = {
        }
        const users = await this.userRepo.getAll(query);

        return users;
    }

}