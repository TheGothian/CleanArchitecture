import { ObjectId } from "mongodb";

export const objectIdToString = (objectId: ObjectId): string => objectId.toHexString();

export const mapDocument = (document: any): any => {
    const { _id: objectId, ...rest } = document;
    const id = objectIdToString(objectId);
    return { ...rest, id };
};