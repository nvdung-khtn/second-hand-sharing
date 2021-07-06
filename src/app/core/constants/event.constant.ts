export class EventType {
    id: number;
    eventName: string;
    startDate: string;
    endDate: string;
    content: string;
    groupId: number;
    groupName: string;
    groupAvatar: string;
}

export class CreateEvent {
    eventName: string;
    startDate: string;
    endDate: string;
    content: string;
}
