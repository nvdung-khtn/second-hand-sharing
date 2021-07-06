import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time',
})
export class TimePipe implements PipeTransform {
    transform(date: string): string {
        const gmt0Time = new Date().toString().replace('+0700', '+1400');
        const endDate = new Date(gmt0Time);
        const startDate = new Date(date);
        const diff = endDate.getTime() - startDate.getTime();
        const years = Math.floor(diff / (60 * 60 * 24 * 1000 * 365));
        const days = Math.floor(diff / (60 * 60 * 24 * 1000));
        const hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
        const minutes = Math.floor(diff / (60 * 1000)) - (days * 24 * 60 + hours * 60);
        const seconds =
            Math.floor(diff / 1000) - (days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60);
        if (years === -1 && days === -1 && hours === 23) {
            return '1 giây trước';
        }

        if (years > 0) {
            return years + ' năm trước';
        }
        if (days > 0) {
            return days + ' ngày trước';
        }
        if (hours > 0) {
            return hours + ' giờ trước';
        }
        if (minutes > 0) {
            return minutes + ' phút trước';
        }
        if (seconds > 0) {
            return seconds + ' giây trước';
        }
    }
}
