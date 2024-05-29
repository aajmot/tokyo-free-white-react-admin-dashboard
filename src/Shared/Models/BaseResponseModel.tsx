export interface BaseResponseModel {
    isSuccess: boolean,
    statusCode: number,
    message: any,
    data: any,
    errors: any
}