import { BaseEntity } from "./baseEntity";

export type TokenParams = {
    value: string,
    userId: string,
    userIp: string,
    expireDate: Date
}

export class Token extends BaseEntity {
    value: string;
    userId: string;
    userIp: string;
    expireDate: Date;

    constructor(params: TokenParams) {
        super("0", new Date());
        this.value = params.value;
        this.userId = params.userId;
        this.userIp = params.userIp;
        this.expireDate = params.expireDate;
    }
}
