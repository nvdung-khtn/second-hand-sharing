export class PagingList<T> {
    pageNumber: number;
    pageSize: number;
    succeeded: boolean;
    message: string;
    data: T[];
}

export class ResponseModel<T> {
    succeeded: boolean;
    message: string;
    data: T;
}
