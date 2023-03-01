
export type Query<T> = {
    [P in keyof T]?: T[P];
};

export interface IBaseRepository<T> {
    create(data: T): Promise<T>;
    readById(id: string): Promise<T | null>;
    updateById(id: string, data: Partial<T>): Promise<number>;
    deleteById(id: string): Promise<number>
    readAll(query?: Query<T>): Promise<T[]>
}