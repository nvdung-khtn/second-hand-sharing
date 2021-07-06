export class RequestSendComment {
    content: string;
}

export class ResponseSendComment {
    data: {
        id: number;
        postId: number;
        content: string;
        postByAccontId: number;
        postTime: string;
    };
}
