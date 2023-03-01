// import { Collection, Db, MongoClient, ObjectID } from 'mongodb';

// type Query<T> = {
//     [P in keyof T]?: T[P];
// };

// class Repository<T> {
//     private readonly url: string;
//     private readonly dbName: string;
//     private readonly collectionName: string;
//     private client: MongoClient;
//     private db?: Db;
//     private collection?: Collection<T>;

//     constructor(url: string, dbName: string, collectionName: string) {
//         this.url = url;
//         this.dbName = dbName;
//         this.collectionName = collectionName;
//         this.client = new MongoClient(url,);
//     }

//     async connect(): Promise<void> {
//         await this.client.connect();
//         this.db = this.client.db(this.dbName);
//         this.collection = this.db.collection<T>(this.collectionName);
//     }

//     async disconnect(): Promise<void> {
//         await this.client.close();
//     }

//     async create(data: T): Promise<T> {
//         const result = await this.collection?.insertOne(data);
//         return result.ops[0];
//     }

//     async readById(id: string | ObjectID): Promise<T | null> {
//         const result = await this.collection.findOne({ _id: new ObjectID(id) });
//         return result;
//     }

//     async updateById(id: string | ObjectID, data: Partial<T>): Promise<number> {
//         const result = await this.collection.updateOne({ _id: new ObjectID(id) }, { $set: data });
//         return result.modifiedCount || 0;
//     }

//     async deleteById(id: string | ObjectID): Promise<number> {
//         const result = await this.collection.deleteOne({ _id: new ObjectID(id) });
//         return result.deletedCount || 0;
//     }

//     async readAll(query?: Query<T>): Promise<T[]> {
//         const result = await this.collection.find(query).toArray();
//         return result;
//     }
// }

// export default Repository;