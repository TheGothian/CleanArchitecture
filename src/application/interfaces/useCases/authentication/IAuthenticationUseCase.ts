import { User } from "@domain/entities/user";
import { IBaseUseCase } from "../IBaseUseCase";

export interface IAuthenticationUseCase extends IBaseUseCase<string, User | undefined> {
    execute(
        authenticationCredentials: string
    ): Promise<User | undefined>;
}