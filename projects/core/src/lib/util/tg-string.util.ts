
/**
 * String Utility
 *
 * @export
 * @class TGStringUtil
 */
export class TGStringUtil {

    /**
     * Ellips string at start of the string
     *
     * @static
     * @param {string} str
     * @param {number} maxEndLength
     * @returns
     * @memberof TGStringUtil
     */
    public static ellipsisStart(str: string, maxEndLength: number) {
        if (!str || str.length <= (maxEndLength + 3)) {
            return str;
        }
        return `...${str.substring(str.length - maxEndLength)}`;
    }

    /**
     * Ellips string at end of the string
     *
     * @static
     * @param {string} str
     * @param {number} maxStartLength
     * @returns
     * @memberof TGStringUtil
     */
    public static ellipsisEnd(str: string, maxStartLength: number) {
        if (!str || str.length <= (maxStartLength + 3)) {
            return str;
        }
        return `${str.substring(0, maxStartLength)}...`;
    }


    /**
     * Ellips string at beween of the string
     *
     * @static
     * @param {string} str
     * @param {number} maxStartLength
     * @param {number} maxEndLength
     * @returns
     * @memberof TGStringUtil
     */
    public static ellipsisInBetween(str: string, maxStartLength: number, maxEndLength: number) {
        if (!str || str.length <= (maxStartLength + maxEndLength + 3)) {
            return str;
        }
        return `${str.substring(0, maxStartLength)}...${str.substring(str.length - maxEndLength)}`;
    }

    /**
     * Trim String - Null safe
     * If data is null, returning same
     *
     * @static
     * @param {*} data
     * @returns
     * @memberof TGStringUtil
     */
    public static trimNullSafe(data: any) {
        if (data) {
            try {
                return data.trim();
            } catch (err) {
                return data;
            }
        }
        return data;
    }
}
