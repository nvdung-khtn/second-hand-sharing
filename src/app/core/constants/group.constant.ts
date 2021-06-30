export class Group {
    id: number;
    groupName: string;
    description: string;
    avatarURL: string;
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
    JOIN_REQUEST,
    ADMIN_INVITE,
    REJECTED,
    ACCEPTED,
}
