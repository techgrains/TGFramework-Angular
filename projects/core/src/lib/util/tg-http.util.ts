import { HttpHeaders } from '@angular/common/http';
import { TG_KEYS } from '../constant/tg-global.constant';


/**
 * Http Utility
 *
 * @export
 * @class TGHttpUtil
 */
export class TGHttpUtil {


    /**
     * Merging headers
     *
     * @static
     * @param {HttpHeaders} headersFrom
     * @param {HttpHeaders} headersTo
     * @returns
     * @memberof TGHttpUtil
     */
    public static mergeHeaders(headersFrom: HttpHeaders, headersTo: HttpHeaders) {
        if (headersFrom) {
            headersFrom.keys().forEach((key) => {
                headersTo = headersTo.append(key, headersFrom.get(key) ?? '');
            });
        }

        return headersTo;
    }

    /**
     * Get HttpHeaders for excluding service loader
     *
     * @static
     * @returns
     * @memberof TGHttpUtil
     */
    public static getExcludeLoaderHeader() {
        const headers = new HttpHeaders();
        return headers.append(TG_KEYS.EXCLUDE_LOADER, 'true');
    }
}
