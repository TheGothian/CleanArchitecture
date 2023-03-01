export type HttpResponse<Tbody = any> = {
    statusCode: number;
    body?: Tbody;
};
