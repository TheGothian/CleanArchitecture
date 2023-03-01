import { ILoginUseCase } from "@application/interfaces/useCases/authentication/ILoginUseCase";
import { LoginUseCase } from "@application/useCases/authentication/loginUseCase";
import { TokenRepository } from "@infrastructure/db/mongodb/repositories/token.repository";
import { UserRepository } from "@infrastructure/db/mongodb/repositories/user.repository";


export const createLoginUserCase = (): ILoginUseCase => {
    const useeRepository = new UserRepository();
    const tokenRepository = new TokenRepository();
    return new LoginUseCase(useeRepository, tokenRepository);
}