import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TGConfig } from './tg-config.service';
import { Observable } from 'rxjs';

/**
 * Wrapper class of `HttpClient`
 *
 * @export
 * @class TGHttpClient
 */
@Injectable()
export class TGHttpClient {
    private tgConfig = inject(TGConfig)
    private httpClient = inject(HttpClient)
    private contextPath: string;

    constructor(
    ) {
        this.contextPath = this.tgConfig.baseAPI;
        console.log('This message comes from tg http client method')
    }

    /**
     * Constructs a `GET` request
     * Base URL will be prepended from the baseAPI of TGConfig
     *
     * @param uri     The URI of API
     * @param options The HTTP options to send with the request.
     *
     * @return An `Observable` of the response
     */
    public get(uri: string, options?: any): Observable<any> {
        return this.httpClient.get(this.contextPath + uri, options);
    }

    /**
     * Constructs a `GET` request
     * Base URL will be prepended from the baseAPI of TGConfig
     * It will replace '?' from `uri` in sequencing order with uriParams
     *
     * @param uri       The URI of API
     * @param uriParams Array of any which is replacing `?` from URI
     * @param options   The HTTP options to send with the request.
     *
     * @return An `Observable` of the response
     */
    public getWithURIParams(uri: string, uriParams: any[], options?: any): Observable<any> {
        return this.get(this.generateURI(uri, uriParams), options);
    }

    /**
     * Constructs a `POST` request
     * Base URL will be prepended from the baseAPI of TGConfig
     *
     * @param uri       The URI of API
     * @param body      Requested data
     * @param options   The HTTP options to send with the request.
     *
     * @return An `Observable` of the response
     */
    public post(uri: string, body: any, options?: any): Observable<any> {
        return this.httpClient.post(this.contextPath + uri, body, options);
    }

    /**
     * Constructs a `POST` request
     * Base URL will be prepended from the baseAPI of TGConfig
     * It will replace '?' from `uri` in sequencing order with uriParams
     *
     * @param uri       The URI of API
     * @param uriParams Array of any which is replacing `?` from URI
     * @param body      Requested data
     * @param options   The HTTP options to send with the request.
     *
     * @return An `Observable` of the response
     */
    public postWithURIParams(uri: string, uriParams: any[], body: any, options?: any): Observable<any> {
        return this.post(this.generateURI(uri, uriParams), body, options);
    }

    /**
     * Constructs a `PUT` request
     * Base URL will be prepended from the baseAPI of TGConfig
     *
     * @param uri       The URI of API
     * @param body      Requested data
     * @param options   The HTTP options to send with the request.
     *
     * @return An `Observable` of the response
     */
    public put(uri: string, body: any, options?: any): Observable<any> {
        return this.httpClient.put(this.contextPath + uri, body, options);
    }

    /**
     * Constructs a `PUT` request
     * Base URL will be prepended from the baseAPI of TGConfig
     * It will replace '?' from `uri` in sequencing order with uriParams
     *
     * @param uri       The URI of API
     * @param uriParams Array of any which is replacing `?` from URI
     * @param body      Requested data
     * @param options   The HTTP options to send with the request.
     *
     * @return An `Observable` of the response
     */
    public putWithURIParams(uri: string, uriParams: any[], body: any, options?: any): Observable<any> {
        return this.put(this.generateURI(uri, uriParams), body, options);
    }

    /**
     * Constructs a `DELETE` request
     * Base URL will be prepended from the baseAPI of TGConfig
     *
     * @param uri       The URI of API
     * @param options   The HTTP options to send with the request.
     *
     * @return An `Observable` of the response
     */
    public delete(uri: string, options?: any): Observable<any> {
        return this.httpClient.delete(this.contextPath + uri, options);
    }

    /**
     * Constructs a `DELETE` request
     * Base URL will be prepended from the baseAPI of TGConfig
     * It will replace '?' from `uri` in sequencing order with uriParams
     *
     * @param uri       The URI of API
     * @param uriParams Array of any which is replacing `?` from URI
     * @param options   The HTTP options to send with the request.
     *
     * @return An `Observable` of the response
     */
    public deleteWithURIParams(uri: string, uriParams: any[], options?: any): Observable<any> {
        return this.delete(this.generateURI(uri, uriParams), options);
    }

    /**
     * Replace '?' from `api` in sequencing order with uriParams
     *
     * @private
     * @param {string} uri
     * @param {any[]} uriParams
     * @returns {string}
     * @memberof TGHttpClient
     */
    private generateURI(uri: string, uriParams: any[]): string {
        let uriTmp = uri;
        uriParams.forEach(param => {
            uriTmp = uriTmp.replace('?', param);
        });
        return uriTmp;
    }
}
