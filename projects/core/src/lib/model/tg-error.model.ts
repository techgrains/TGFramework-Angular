import { HttpErrorResponse } from '@angular/common/http';

/**
 * This class will be overridden in TGConfig
 *
 * @export
 * @class TGError
 */
export class TGError {
    public fromJson(json) {
        return json;
    }

    public fromHttpErrorResponse(httpErrorResponse: HttpErrorResponse) {
        return httpErrorResponse.error;
    }
}
