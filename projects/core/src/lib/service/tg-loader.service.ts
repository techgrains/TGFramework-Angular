import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TGLoaderService {

    public onLoaderChange$: BehaviorSubject<boolean>;
    private serviceCallCount = 0;

    constructor() {
        this.onLoaderChange$ = new BehaviorSubject(false);
    }

    start() {
        this.serviceCallCount++;
        if (this.serviceCallCount > 0) {
            this.onLoaderChange$.next(true);
        }
    }

    end() {
        if (this.serviceCallCount > 0) {
            this.serviceCallCount--;
        }
        if (this.serviceCallCount < 1) {
            this.onLoaderChange$.next(false);
        }
    }
}
