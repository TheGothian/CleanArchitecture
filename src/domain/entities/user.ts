import { BaseEntity } from "./baseEntity";

export type UserProps = {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
};

export class User extends BaseEntity {

    public readonly name: string;

    public readonly username: string;

    public readonly email: string;

    public readonly password: string;

    public readonly updatedAt?: Date;

    constructor(userProps: UserProps) {
        super(userProps.id, userProps.createdAt)
        this.name = userProps.name;
        this.username = userProps.username;
        this.email = userProps.email;
        this.password = userProps.password;
        this.updatedAt = userProps.updatedAt;
    }
}
