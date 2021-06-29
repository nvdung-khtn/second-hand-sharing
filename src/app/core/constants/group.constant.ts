export class Group {
    id: number;
    groupName: string;
    description: string;
    avatarURL: string;
    createDate: string;
    rules: string;
}

export class Member {
    userId: number;
    fullName: string;
    joinStatus: number;
    joinDate: string;
    avatarUrl: string;
}
