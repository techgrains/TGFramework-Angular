import { HttpErrorResponse } from '@angular/common/http';

export class TGError {
    public fromJson(json) {
        return json;
    }

    public fromHttpErrorResponse(httpErrorResponse: HttpErrorResponse) {
        return httpErrorResponse.error;
    }
}
