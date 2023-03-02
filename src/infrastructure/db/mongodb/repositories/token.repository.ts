import { ITokenRepository } from "@application/interfaces/repositories/IToken.repository";
import { Token, TokenParams } from "@domain/entities/token";
import { injectable } from "inversify";
import { Collection, ObjectId } from "mongodb";
import DbConnection from "../helpers/db-connection";
import { objectIdToString } from "../helpers/mapper";

const COLLECTION_NAME = "Tokens";

@injectable()
export class TokenRepository implements ITokenRepository {


    static async getCollection(): Promise<Collection> {
        return DbConnection.getCollection(COLLECTION_NAME);
    }

    async findOneById(id: string): Promise<Token | null> {
        // TODO: A ObjectId Guard
        return this.findByQuery({ _id: id })
    }

    findOneByValue(value: string): Promise<Token | null> {
        return this.findByQuery({ value });
    }

    async findOneByUserId(userId: string): Promise<Token | null> {
        // TODO: A ObjectId Guard
        return this.findByQuery({ userId });
    }

    private async findByQuery(query: object): Promise<Token | null> {
        const tokenCollection = await TokenRepository.getCollection();
        const token: any = await tokenCollection.findOne(query);

        return token;
    }

    async save(tokenParam: TokenParams): Promise<string> {
        const tokenCollection = await TokenRepository.getCollection();

        const { value,
            userId,
            userIp,
            expireDate } = tokenParam;

        const { insertedId: id } = await tokenCollection.insertOne({ value, userId: new ObjectId(userId), userIp, expireDate });

        return objectIdToString(id);
    }

    async remove(id: string): Promise<boolean> {
        const tokenCollection = await TokenRepository.getCollection();

        const result = await tokenCollection.deleteOne({ _id: id });

        return result.acknowledged;
    }
}