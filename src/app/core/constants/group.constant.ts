import { UserInfo } from './user.constant';

export class Group {
    id: number;
    groupName: string;
    description: string;
    avatarUrl: string;
    createDate: string;
    rules: string;
}

export class Member {
    requesterId: number;
    requesterName: string;
    joinStatus: MemberJoinStatus;
    createDate: string;
    avatarUrl: string;
}

export enum MemberJoinStatus {
    NULL,
    JOIN_REQUEST,
    ADMIN_INVITE,
    REJECTED,
    ACCEPTED,
}

export class Group_Member {
    constructor(
        public admin: UserInfo[],
        public member: UserInfo[],
        public joinedRequest: UserInfo[]
    ) {}
}

