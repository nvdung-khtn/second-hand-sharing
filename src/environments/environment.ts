// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'https://secondhandsharing.appspot.com',
    // apiUrl: 'https://twohandsharing.appspot.com',
    // apiUrl: 'https://webapi-s2yui3igrq-as.a.run.app',
    firebase: {
        apiKey: 'AIzaSyBglB1eqRFoLbjbw1NnINUHuxN9upBM6jA',
        authDomain: 'two-hand-sharing.firebaseapp.com',
        databaseURL: 'https://two-hand-sharing-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'two-hand-sharing',
        storageBucket: 'two-hand-sharing.appspot.com',
        messagingSenderId: '897208395495',
        appId: '1:897208395495:web:69ee3a68a4aaa7cd4ca442',
        measurementId: 'G-XBM3940B1X',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
