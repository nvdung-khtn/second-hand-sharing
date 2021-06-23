import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

import { MessagingService } from 'src/app/shared/service/message.service';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { AddressService } from './shared/service/address.service';

function initializeApp(addressService: AddressService) {
    return () => addressService.loadData();
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        // Modules of Angular
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        // third-party modules
        ToastrModule.forRoot({
            timeOut: 2000,
            progressBar: false,
            enableHtml: true,
        }),

        // Custom Modules
        SharedModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase),

        AppRoutingModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        MessagingService,
        AsyncPipe,
        AddressService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AddressService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
