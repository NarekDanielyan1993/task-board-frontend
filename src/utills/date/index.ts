import { format, isBefore, parseISO } from 'date-fns';
// eslint-disable-next-line camelcase
import { d_MMM } from 'src/constant';

class CustomDate {
    static formatIsoDateTo(isoDate: string, shape: string = d_MMM) {
        const formattedDate = format(parseISO(isoDate), shape);
        return formattedDate;
    }

    static isDatePast(isoDate: string): boolean {
        const dateToCheck = parseISO(isoDate);
        const currentDate = new Date();
        return isBefore(dateToCheck, currentDate);
    }
}

export default CustomDate;
