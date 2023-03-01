import { CreateUserRepository, IUserRepository, Query } from "@application/interfaces/repositories/IUser.repository";
import { User } from "@domain/entities/user";
import { Collection, ObjectId } from "mongodb";
import DbConnection from "../helpers/db-connection";
import { mapDocument } from "../helpers/mapper";

const COLLECTION_NAME = "Users";

export class UserRepository implements IUserRepository {
    async getAll(query?: Query<User> | undefined): Promise<User[]> {
        const userCollection = await UserRepository.getCollection();

        // const test = {
        //     ...query, $and: [
        //         {
        //             $or: [
        //                 { age: { $gt: 20 } },
        //                 { email: { $regex: /@example.com$/ } }
        //             ]
        //         }
        //     ]
        // }

        const users = await userCollection.find(query as object).toArray();

        return users;
    }

    static async getCollection(): Promise<Collection<User>> {
        const db = await DbConnection.getInstance();

        return db.collection<User>(COLLECTION_NAME);
    }

    async findOneByUserName(userData: CreateUserRepository.Request): Promise<CreateUserRepository.Response> {
        const userCollection = await UserRepository.getCollection();
        // TODO: A ObjectId Guard

        const rawUser = await userCollection.findOne({ username: userData });
        return rawUser && mapDocument(rawUser);
    }

    async findOneById(id: string): Promise<User | undefined> {
        const userCollection = await UserRepository.getCollection();
        // TODO: A ObjectId Guard

        const rawUser = await userCollection.findOne({ _id: new ObjectId(id) });
        return rawUser && mapDocument(rawUser);
    }
}