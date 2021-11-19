export interface IRawResponse {
    id: string;
    result: string;
    data?: TRawResponseData;
    version: string;
    message?: string;
    errCode?: number;
}

export type TRawResponseData = string | object[] | object;

export interface ISucceedWithoutDataResponse {
    result: string;
}
