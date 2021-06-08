import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    AfterViewChecked,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { MessageClient } from 'src/app/core/api-clients/message.client';
import { MessagingService } from '../../service/message.service';
@Component({
    selector: 'app-messenger',
    templateUrl: './messenger.component.html',
    styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent implements OnInit, AfterViewChecked {
    @Input() usersInfo;
    @Input() changeMessage;
    @Input() isOpenModal: boolean;
    @Output() modalChange = new EventEmitter<boolean>();
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    myInfo;
    myInput = '';
    newMessage;

    messageData: any;

    constructor(private messageClient: MessageClient, private messagingService: MessagingService) {}

    ngOnInit(): void {
        this.scrollToBottom();
        this.myInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.messagingService.receiveMessage().subscribe((payload) => {
            this.newMessage = JSON.parse(payload.data.message);
            this.messageData?.data.unshift(this.newMessage);
        });
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnChanges(): void {
        let id;
        this.usersInfo?.sendFromAccountId !== this.myInfo?.id
            ? (id = this.usersInfo?.sendFromAccountId)
            : (id = this.usersInfo?.sendToAccountId);
        this.messageClient.getMessageByUserId(id, 1, 100).subscribe(
            (response) => {
                this.messageData = response;
            },
            (error) => console.log(error)
        );
    }

    // tslint:disable-next-line: typedef
    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop =
                this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) {}
    }

    onClose = () => {
        this.isOpenModal = false;
        this.modalChange.emit(this.isOpenModal);
    };

    onSend = () => {
        let id;
        this.usersInfo?.sendFromAccountId !== this.myInfo.id
            ? (id = this.usersInfo?.sendFromAccountId)
            : (id = this.usersInfo?.sendToAccountId);
        const sendMessageForm = {
            content: this.myInput,
            sendToAccountId: id,
        };
        this.messageClient.sendMessage(sendMessageForm).subscribe(
            (response) => {
                this.messageData?.data.unshift(response?.data);
                this.myInput = '';
            },
            (error) => console.log(error)
        );
    };

    handleAccountName = (user: any) => {
        let name = '';
        if (user === undefined) {
            name = '';
        } else {
            user.sendFromAccountId !== this.myInfo.id
                ? (name = user.sendFromAccountName)
                : (name = user.sendToAccountName);
        }
        return name;
    };
}
