import { ForbiddenError } from "@application/errors/forbiddenError";
import { ITokenRepository } from "@application/interfaces/repositories/IToken.repository";
import { IUserRepository } from "@application/interfaces/repositories/IUser.repository";
import { ILoginUseCase, loginRequest } from "@application/interfaces/useCases/authentication/ILoginUseCase";
import { makeId } from "../../util/tokenGenerator";

export class LoginUseCase implements ILoginUseCase {
    private tokenRepo: ITokenRepository;
    private userRepo: IUserRepository;

    constructor(userRepository: IUserRepository, tokenRepository: ITokenRepository) {
        this.userRepo = userRepository;
        this.tokenRepo = tokenRepository;
    }

    async execute(authenticationCredentials: loginRequest): Promise<string> {
        const { username, password } = authenticationCredentials;
        const user = await this.userRepo.findOneByUserName(username);

        if (!user) {
            throw new ForbiddenError();

        }

        if (user.password !== password) {
            throw new ForbiddenError();
        }

        const token = await this.tokenRepo.findOneByUserId(user.id);

        let value = makeId(24);
        if (token === null) {

            this.tokenRepo.save({
                value: value,
                userId: user.id,
                userIp: "127.0.0.1",
                expireDate: new Date()
            })
        }
        else {
            value = token.value;
        }

        return value;
    }
}