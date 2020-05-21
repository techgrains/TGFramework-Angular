import { HttpHeaders } from '@angular/common/http';
import { TG_KEYS } from '../constant/tg-global.constant';

export class TGHttpUtil {

    public static mergeHeaders(headersFrom: HttpHeaders, headersTo: HttpHeaders) {
        if (headersFrom) {
            headersFrom.keys().forEach((key) => {
                headersTo = headersTo.append(key, headersFrom.get(key));
            });
        }

        return headersTo;
    }

    public static getExcludeLoaderHeader() {
        const headers = new HttpHeaders();
        return headers.append(TG_KEYS.EXCLUDE_LOADER, 'true');
    }
}
