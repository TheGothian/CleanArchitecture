import { AuthenticationUseCase } from "@application/useCases/authentication/authenticationUseCase";
import { TokenRepository, UserRepository } from "@infrastructure/db/mongodb/repositories";

export default () => {
    const tokenRepo = new TokenRepository();
    const userRepo = new UserRepository();
    return new AuthenticationUseCase(tokenRepo, userRepo)
}