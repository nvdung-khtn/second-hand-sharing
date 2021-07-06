import { UserInfo } from './user.constant';

export class CreatePostRequest {
    content: string;
    visibility: number;
    imageNumber: number;
    groupId: number;
}

export class Group_Post {
    id: number;
    content: string;
    postTime: string;
    imageUrl: string[];
    postByAccountId: number;
    postByAccountName: string;
    avatarUrl: string | null;
}
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
