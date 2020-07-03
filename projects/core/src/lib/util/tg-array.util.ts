
/**
 * Array utility
 *
 * @export
 * @class TGArrayUtil
 */
export class TGArrayUtil {

    /**
     * Find from array
     * In case of not found, returning defaultValue
     *
     * @static
     * @param {Array<any>} array    Array of data
     * @param {*} key               Key of object in Array
     * @param {*} compareValue      Comparable value
     * @param {*} [defaultValue]    Default Value, in case of not found
     * @returns
     * @memberof TGArrayUtil
     */
    public static find(array: Array<any>, key: any, compareValue: any, defaultValue?: any) {
        if (array) {
            const foundItem = array.find(item => item[key] === compareValue);
            if (foundItem) {
                return foundItem;
            }
        }
        return defaultValue;
    }
}
