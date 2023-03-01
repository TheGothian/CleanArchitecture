import { User } from "@domain/entities/user";



export type Query<T> = {
    [P in keyof T]?: T[P];
} | RootFilterOperators<T>;

export declare interface RootFilterOperators<TSchema> {
    $and?: Query<TSchema>[];
    $nor?: Query<TSchema>[];
    $or?: Query<TSchema>[];
    $text?: {
        $search: string;
        $language?: string;
        $caseSensitive?: boolean;
        $diacriticSensitive?: boolean;
    };
    $where?: string | ((this: TSchema) => boolean);
}

export interface IUserRepository {
    findOneById(id: string): Promise<User | undefined>;
    getAll(query?: Query<User>): Promise<User[]>;
    findOneByUserName(userData: CreateUserRepository.Request): Promise<CreateUserRepository.Response>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateUserRepository {
    export type Request = string
    export type Response = User | null;
}
