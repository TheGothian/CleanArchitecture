import { Token, TokenParams } from "@domain/entities/token";

export interface ITokenRepository {
    findOneByUserId(userId: string): Promise<Token | null>
    findOneById(id: string): Promise<Token | null>
    findOneByValue(value: string): Promise<Token | null>
    save(tokenParam: TokenParams): Promise<string>
    remove(id: string): Promise<boolean>
}