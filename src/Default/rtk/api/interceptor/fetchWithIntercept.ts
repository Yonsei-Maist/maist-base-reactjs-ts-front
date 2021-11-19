import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import { IRawResponse, TRawResponseData } from '../../models';

import type { RootState } from '../../store';

export const HttpStatus = {
    UNAUTHORIZED: 401,
};

export const fetchWithIntercept: BaseQueryFn<
    string | FetchArgs,
    TRawResponseData,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // dynamic baseUrl from config state
    const baseUrl = (api.getState() as RootState).config.baseUrl;
    const dynamicBaseQuery = fetchBaseQuery({
        baseUrl,
        /* prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }, */ // TODO: Implement prepareHeaders
    });

    const resultRawBaseQuery: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta> =
        await dynamicBaseQuery(args, api, extraOptions);
    const { data: rawResponse, error, meta } = resultRawBaseQuery;
    const { request } = meta as FetchBaseQueryMeta;
    const { result, data, message, errCode } = rawResponse as IRawResponse;
    const url: string = request.url;
    if (process.env && process.env.NODE_ENV === 'development') {
        logHttpRequestDetails({
            method: request.method,
            url: request.url,
            data: JSON.stringify(request.body),
        });
        console.log('rawResponse: ', rawResponse);
    }

    // if error from server like 404, 500
    if (error) {
        const { status } = error as FetchBaseQueryError;
        handleHttpError(Number(status), url);
        return Promise.reject(JSON.stringify(error));
    }

    // if fail
    if (result === 'fail' && message !== undefined) {
        if (errCode === HttpStatus.UNAUTHORIZED) {
            // TODO: Implement refreshToken
            // refreshToken();
        }
        return Promise.reject(message);
    }

    // if success with data
    if (result === 'success' && data !== undefined) {
        return { data };
    }

    // if success without data
    return { data: { result } };
};

// TODO: modify handleHttpError method to handle for particular http error status code of the response
export const handleHttpError = (httpStatus: number, url: string) => {
    switch (httpStatus) {
        case 400:
            console.log(`Error ${httpStatus} at: ${url}`);
            break;
        case 401:
            console.log(`Error ${httpStatus} at: ${url}`);
            // Server send response with status code 200 and with
            // {
            //     "id": "request ID",
            //     "version": "app version",
            //     "result": "fail"
            //     "message": "error message",
            //     "errorCode":  401,
            // }
            // refreshToken will be handled in fetchWithIntercept
            break;
        case 403:
            console.log(`Error ${httpStatus} at: ${url}`);
            break;
        case 404:
            console.log(`Error ${httpStatus} at: ${url}`);
            break;
        default:
            console.log(`Error ${httpStatus} at: ${url}`);
            break;
    }
};

// TODO: Implement refreshToken
/* const refreshToken = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {},
    rawBaseQuery: BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
    >
) => {
    // try to get a new token
    const refreshResult = await rawBaseQuery(
        '/refreshToken',
        api,
        extraOptions
    );
    if (refreshResult.data) {
        // store the new token
        api.dispatch(tokenReceived(refreshResult.data));
        // retry the initial query
        result = await rawBaseQuery(args, api, extraOptions);
    } else {
        api.dispatch(loggedOut());
    }
}; */

interface IHttpRequestDetails {
    method?: string;
    url?: string;
    data?: string;
}

export const logHttpRequestDetails = (params: IHttpRequestDetails): void => {
    const str: string = `
      ==================Details=======================>
      method: ${params?.method} \n
      url: ${params?.url} \n
      data: ${params?.data}
      <=========================================
      `;
    console.log(str);
};
