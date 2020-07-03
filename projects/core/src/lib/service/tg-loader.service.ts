import { Injectable, EventEmitter } from '@angular/core';

/**
 * Service Loader class
 *
 * It will fire events on first the request and last response
 *
 * ### onLoaderChange$ Event subscription
 * ```
 * @example
 * onLoaderChange$.subscribe(res => {
 *      if(res) {
 *          // Show Loader
 *      } else {
 *          // Hide Loader
 *      }
 * });
 * ```
 * @export
 * @class TGLoaderService
 */
@Injectable()
export class TGLoaderService {

    /**
     * Loader change event emitter
     *
     * @Type {EventEmitter<boolean>}
     */
    public onLoaderChange$: EventEmitter<boolean>;
    private serviceCallCount = 0;

    constructor() {
        this.onLoaderChange$ = new EventEmitter(false);
    }

    /**
     * Increasing service call count
     * If serviceCallCount > 0, emitting onLoaderChange$.next(true)
     */
    start() {
        this.serviceCallCount++;
        if (this.serviceCallCount > 0) {
            this.onLoaderChange$.next(true);
        }
    }

    /**
     * Decreasing service call count
     * If serviceCallCount < 1, emitting onLoaderChange$.next(false)
     */
    end() {
        if (this.serviceCallCount > 0) {
            this.serviceCallCount--;
        }
        if (this.serviceCallCount < 1) {
            this.onLoaderChange$.next(false);
        }
    }
}
