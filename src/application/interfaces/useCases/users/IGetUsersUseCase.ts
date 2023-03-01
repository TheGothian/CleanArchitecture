import { User } from "@domain/entities/user";
import { IBaseUseCase } from "../IBaseUseCase";

export interface IGetUsersUseCase extends IBaseUseCase<string[], User[]> {
    execute(
        userIdArray: string[]
    ): Promise<User[]>;
}