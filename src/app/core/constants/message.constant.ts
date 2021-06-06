export class MessageConstant {
  pageNumber?: number;
  pageSize?: number;
  data?: Message[];
}

export class Message {
  id: number;
  content: string;
  sendDate: string;
  sendFromAccountId: number;
  sendToAccountId: number;
}

export class RequestSendMessage {
  content: string;
  sendToAccountId: number;
}

export class ResponseSendMessage {
  data: {
    id: number;
    content: string;
    sendDate?: string;
    sendFromAccountId: number;
    sendToAccountId: number;
  };
}
