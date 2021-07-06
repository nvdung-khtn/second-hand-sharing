import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'remainTime',
})
export class RemainTimePipe implements PipeTransform {
    transform(date: string): string {
        const gmt0Time = new Date().toString().replace('+0700', '+1400');
        const now = new Date(gmt0Time);
        const end = new Date(date);
        if (now > end) {
            return 'Sự kiện đã kết thúc';
        } else {
            const timeleft = end.getTime() - now.getTime();
            const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

            if (days/7 - days%7 > 0) {
                const week = days % 7 + 1;
                return week + ' tuần';
            }
            if (days/7 - days%7 === 0) {
                const week = days % 7;
                return week + ' tuần';
            }

            if (days > 0) {
                return days + ' ngày';
            }
            if (hours > 0) {
                return hours + ' giờ';
            }
            if (minutes > 0) {
                return minutes + ' phút';
            }
            if (seconds > 0) {
                return seconds + ' giây';
            }
        }
    }
}
