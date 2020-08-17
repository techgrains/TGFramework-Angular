
/**
 * TGMockMapping is using for Mapping Mock Services
 *
 * @export
 * @Interface TGMockMapping
 */
export interface TGMockMapping {

    /**
     * Real URI, which is required to be mock
     */
    uri: string;

    /**
     * Regex URI, which is required to be mock
     */
    uriRegex?: any;

    /*
     * Real Service Method
     */
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';

    /*
     * Service level mocking
     * Incase of false, Interceptor will call Real Service
     */
    applyMock: boolean;

    /*
     * HttpStatus which should be return in case of mock service
     * If httpStatus is between 200 to 299, Interceptor will response `successFile`, otherwise `errorFile`
     */
    httpStatus: number;

    /*
     * Success mock response
     */
    successFile: string;

    /*
     * Error mock response
     */
    errorFile: string;
}
