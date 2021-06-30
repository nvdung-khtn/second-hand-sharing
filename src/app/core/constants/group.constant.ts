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
    joinStatus: number;
    createDate: string;
    avatarUrl: string;
}
