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
