import { User } from "@domain/entities/user";
import dbConnection from "@infrastructure/db/mongodb/helpers/db-connection";
import { UserRepository } from "@infrastructure/db/mongodb/repositories/user.repository";
import env from "@main/config/env";
import { Collection } from "mongodb";
import { createMockUser } from "../../../domain/mock/entities";


describe('User repository', () => {
    let userCollection: Collection<User>;

    beforeAll(async () => {
        await dbConnection.connect(env.mongoUrl);
    });

    afterAll(async () => {
        await dbConnection.disconnect();
    });

    beforeEach(async () => {
        userCollection = await UserRepository.getCollection();
        await userCollection.deleteMany({});
    });

    it('should get user based on username', async () => {
        const userRepository = new UserRepository();
        const { name, email, password, username } = createMockUser();

        await userCollection.insertOne({
            name, email, username, password, createdAt: new Date(2022, 1, 1), id: "234"
        });

        const response = await userRepository.findOneByUserName(username);
        expect(response).toBeTruthy();
    })

    it('should get user based on id', async () => {
        const userRepository = new UserRepository();
        const { name, email, password, username } = createMockUser();

        const { insertedId: id1 } = await userCollection.insertOne({
            name, email, password, username, createdAt: new Date(2022, 1, 1), id: "22"
        });

        const response = await userRepository.findOneById(id1.toString());
        expect(response).toBeTruthy();
    })

    it('should get all user in the db', async () => {
        const userRepository = new UserRepository();

        const user1 = createMockUser();
        const user2 = createMockUser();
        const user3 = createMockUser();

        const userArray = [user1, user2, user3];

        for (const element of userArray) {
            await userCollection.insertOne(
                { ...element }
            );
        }

        const result = await userRepository.getAll();

        expect(result).toHaveLength(userArray.length);
    })

    it.todo('should fail to insert two users with same username');
})