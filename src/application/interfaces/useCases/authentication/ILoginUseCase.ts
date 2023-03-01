import { IBaseUseCase } from "../IBaseUseCase";


export interface ILoginUseCase extends IBaseUseCase<loginRequest, string> {
    execute(
        authenticationCredentials: loginRequest
    ): Promise<string>;
}

export type loginRequest = {
    username: string;
    password: string
}