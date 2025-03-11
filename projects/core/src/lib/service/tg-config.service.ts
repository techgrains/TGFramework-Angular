import { Injectable } from '@angular/core';
import { TGMockMapping } from '../model';

/**
 * TGCoreModule configuration class
 *
 * @export
 * @class TGConfig
 */
@Injectable()
export class TGConfig {

    /** Base API Url */
    public baseAPI = '';

    /** Error Class - Transformating service errors into this class */
    public errorClass: any;

    /**
     * Service Mocking flag
     * If true, it will check in MockMapping for mocking services
     */
    public applyMock = false;

    /**
     * Mock Services mapping
     * It is using in `TGMockHttpInterceptor` interceptor for mock services
     */
    public mockMapping: TGMockMapping[] = [];
}
