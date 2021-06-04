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

export class SearchRequest {
    //searchTerm?: string;
    pageNumber?: number;
    pageSize?: number;

    constructor(pageNumber: number = 1, pageSize: number = 10) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}
