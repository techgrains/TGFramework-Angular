import * as momentImported from 'moment';
const moment = momentImported;

/**
 * Date utility
 *
 * @export
 * @class TGDateUtil
 */
export class TGDateUtil {

    /**
     * Format Date object to string
     *
     * It is using moment js formatting - https://momentjs.com/docs/#/displaying/
     *
     * @static
     * @param {*} value - Date in string or object
     * @param {string} [format]
     * @returns {(string | null)}
     * @memberof TGDateUtil
     */
    public static formatDate(value: any, format?: string): string | null {
        return moment(value).format(format);
    }

    /**
     * Parse String to Date object
     *
     * It is using moment js formatting - https://momentjs.com/docs/#/displaying/
     *
     * @static
     * @param {*} value - Date in string or object
     * @param {string} [format]
     * @returns {(Date | null)}
     * @memberof TGDateUtil
     */
    public static parseDate(value: any, format?: string): Date | null {
        return moment(value, format).toDate();
    }

    /**
     * Dates difference in Days
     *
     * @static
     * @param {*} date1 - Date in string or object
     * @param {*} date2 - Date in string or object
     * @returns {(number | null)}
     * @memberof TGDateUtil
     */
    public static diffrenceDays(date1: any, date2: any): number | null {
        return moment(date1).diff(moment(date2), 'days');
    }

    /**
     * Dates difference in Months
     *
     * @static
     * @param {*} date1 - Date in string or object
     * @param {*} date2 - Date in string or object
     * @returns {(number | null)}
     * @memberof TGDateUtil
     */
    public static diffrenceMonths(date1: any, date2: any): number | null {
        return moment(date1).diff(moment(date2), 'month');
    }

    /**
     * Dates difference in Years
     *
     * @static
     * @param {*} date1 - Date in string or object
     * @param {*} date2 - Date in string or object
     * @returns {(number | null)}
     * @memberof TGDateUtil
     */
    public static diffrenceYears(date1: any, date2: any): number | null {
        return moment(date1).diff(moment(date2), 'years');
    }

    /**
     * Validate valueDate is in between start and end dates
     *
     * @static
     * @param {*} starDate - Date in string or object
     * @param {*} endDate - Date in string or object
     * @param {*} valueDate - Date in string or object
     * @returns {(boolean)}
     * @memberof TGDateUtil
     */
    public static isInBetweenRange(starDate: any, endDate: any, valueDate: any): boolean {
        const startMoment = moment(starDate);
        const endMoment = moment(endDate);
        const valueMoment = moment(valueDate);
        return startMoment <= valueMoment && valueMoment <= endMoment;
    }

    /**
     * Validate valueDate is before target date
     *
     * @static
     * @param {*} targetDate - Date in string or object
     * @param {*} valueDate - Date in string or object
     * @returns {(boolean)}
     * @memberof TGDateUtil
     */
    public static isBeforeDate(valueDate: any, targetDate: any): boolean {
        const targetMoment = moment(targetDate);
        const valueMoment = moment(valueDate);
        return valueMoment.isBefore(targetMoment);
    }

    /**
     * Validate valueDate is after target date
     *
     * @static
     * @param {*} targetDate - Date in string or object
     * @param {*} valueDate - Date in string or object
     * @returns {(boolean)}
     * @memberof TGDateUtil
     */
    public static isAfterDate(valueDate: any, targetDate: any): boolean {
        const targetMoment = moment(targetDate);
        const valueMoment = moment(valueDate);
        return valueMoment.isAfter(targetMoment);
    }
}
