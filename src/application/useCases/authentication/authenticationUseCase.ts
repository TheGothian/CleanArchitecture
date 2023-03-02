import { ITokenRepository } from "@application/interfaces/repositories/IToken.repository";
import { IUserRepository } from "@application/interfaces/repositories/IUser.repository";
import { User } from "@domain/entities/user";
import { BINDINGS } from "@infrastructure/loaders/bindings";
import { inject, injectable } from "inversify";
import { IAuthenticationUseCase } from "../../interfaces/useCases/authentication/IAuthenticationUseCase";

@injectable()
export class AuthenticationUseCase implements IAuthenticationUseCase {

    constructor(
        @inject(BINDINGS.TokenRepository) private tokenRepo: ITokenRepository,
        @inject(BINDINGS.UserRepository) private userRepo: IUserRepository
    ) { }

    async execute(authenticationCredentials: string): Promise<User | undefined> {

        const token = await this.tokenRepo.findOneByValue(authenticationCredentials)
        if (!token) {
            // hittade inte token 
            return undefined;
        }

        const user = await this.userRepo.findOneById(token.userId);

        if (!user) {
            // no user found for that token.
            this.tokenRepo.remove(token.id);

            return undefined;
        }


        return user;
    }

}

function Inject(TokenRepository: BINDINGS) {
    throw new Error("Function not implemented.");
}
