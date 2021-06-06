import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FirebaseClient } from 'src/app/core/api-clients/firebase.client';

export interface INotificationPayload {
    body?: string;
    title?: string;
}
export interface MessagePayload {
    notification: INotificationPayload;
    data?: { [key: string]: string };
}
@Injectable()
export class MessagingService {
    currentMessage = new BehaviorSubject(null);

    constructor(
        private angularFireDB: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth,
        private angularFireMessaging: AngularFireMessaging,
        private firebaseClient: FirebaseClient
    ) {
        /* this.angularFireMessaging.messages.subscribe(
            // tslint:disable-next-line: variable-name
            (_messaging: AngularFireMessaging) => {
                _messaging.onMessage = _messaging.onMessage.bind(_messaging);
                _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
            }
        ); */
    }
    private messaginObservable = new Observable<MessagePayload>((observe) => {
        this.angularFireMessaging.onMessage((payload) => {
            observe.next(payload);
        });
    });

    receiveMessage = () => {
        return this.messaginObservable;
    }

    updateToken = (userId, token) => {
        this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
            const data = {};
            data[userId] = token;
            this.angularFireDB.object('fcmTokens/').update(data);
        });
    }

    // tslint:disable-next-line: typedef
    requestPermission(userId) {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                console.log(token);
                this.updateToken(userId, token);
                const checkToken = localStorage.getItem('firebaseToken');
                let oldToken = false;
                if (checkToken) {
                    if (checkToken === token) {
                        oldToken = true;
                    }
                }
                // tslint:disable-next-line: no-unused-expression
                !oldToken && localStorage.setItem('firebaseToken', token);
                // tslint:disable-next-line: no-unused-expression
                !oldToken &&
                    this.firebaseClient.registerFirebase(token).subscribe(
                        (response) => {
                            console.log(response);
                        },
                        (error) => console.log(error)
                    );
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }

    /**
     * hook method when new notification received in foreground
     */
    /* receiveMessage = () => {
        this.angularFireMessaging.messages.subscribe((payload) => {
            console.log('new message received. ', payload);
            this.currentMessage.next(payload);
            return payload;
        });
    } */
}
