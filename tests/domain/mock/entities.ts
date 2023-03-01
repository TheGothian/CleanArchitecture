import { TokenParams } from "@domain/entities/token";
import { User } from "@domain/entities/user";
import { ObjectId } from "bson";

export const createMockUser = (): User => {
    return new User({
        id: "anyId",
        name: "fakeName",
        email: "fake@email.com",
        password: "Qwerty123",
        username: "fakeUsername",
        createdAt: new Date()
    });
}

export const createMockToken = (): TokenParams => {
    return {
        expireDate: new Date(),
        userId: new ObjectId().toString(),
        userIp: "127.0.0.1",
        value: "ABC123"
    }
}