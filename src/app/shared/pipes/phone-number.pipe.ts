import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
    constructor() {}

    transform(phoneNumber: string): string {
        return phoneNumber && phoneNumber.slice(0, 3) + ' ' + phoneNumber.slice(3, 6) + ' ' + phoneNumber.slice(6);
    }
}
