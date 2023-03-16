import "reflect-metadata";


import dbConnection from "@infrastructure/db/mongodb/helpers/db-connection";
import { TokenRepository } from "@infrastructure/db/mongodb/repositories";
import env from "@main/config/env";
import { Collection } from "mongodb";
import { createMockToken } from "../../../domain/mock/entities";

describe('Token repository', () => {
    let tokenCollection: Collection;

    beforeAll(async () => {
        await dbConnection.connect(env.mongoUrl);
    });

    afterAll(async () => {
        await dbConnection.disconnect();
    });

    beforeEach(async () => {
        tokenCollection = await TokenRepository.getCollection();
        await tokenCollection.deleteMany({});
    });

    it('should get token based on userId', async () => {
        const tokenRepository = new TokenRepository();
        const { expireDate, userId, userIp, value } = createMockToken();

        await tokenCollection.insertOne({
            expireDate, userId, userIp, value
        });

        const response = await tokenRepository.findOneByUserId(userId);
        expect(response).toBeTruthy();
    })

    it('should save token', async () => {
        const tokenRepository = new TokenRepository();
        const tokenParams = createMockToken();


        const id = await tokenRepository.save(tokenParams);

        expect(id).toBeTruthy();
    })

    it.todo('should fail to insert two users with same token');
})