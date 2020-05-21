import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TGConfig } from './tg-config.service';
import { Observable } from 'rxjs';

@Injectable()
export class TGHttpClient {

    private contextPath: string;

    constructor(
        private httpClient: HttpClient,
        private tgConfig: TGConfig,
    ) {
        this.contextPath = this.tgConfig.baseAPI;
    }

    public get(uri, options?): Observable<any> {
        return this.httpClient.get(this.contextPath + uri, options);
    }

    public getWithURIParams(uri, uriParams: string[], options?): Observable<any> {
        return this.get({ api: this.generateURI(uri, uriParams) }, options);
    }

    public post(uri, body: any, options?): Observable<any> {
        return this.httpClient.post(this.contextPath + uri, body, options);
    }

    public postWithURIParams(uri, uriParams: string[], body: any, options?): Observable<any> {
        return this.post({ api: this.generateURI(uri, uriParams) }, body, options);
    }

    public put(uri, body: any, options?): Observable<any> {
        return this.httpClient.put(this.contextPath + uri, body, options);
    }

    public putWithURIParams(uri, uriParams: string[], body: any, options?): Observable<any> {
        return this.put({ api: this.generateURI(uri, uriParams) }, body, options);
    }

    public delete(uri, options?): Observable<any> {
        return this.httpClient.delete(this.contextPath + uri, options);
    }

    public deleteWithURIParams(uri, uriParams: string[], options?): Observable<any> {
        return this.delete({ api: this.generateURI(uri, uriParams) }, options);
    }

    private generateURI(api, uriParams): string {
        let uriTmp = api;
        uriParams.forEach(param => {
            uriTmp = uriTmp.replace('?', param);
        });
        return uriTmp;
    }
}
