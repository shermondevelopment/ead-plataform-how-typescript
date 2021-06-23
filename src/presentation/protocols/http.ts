export interface HttpRequest {
    body?: any
    query?: any
    params?: any
    headers?: any
    accountId?: any
}

export interface HttpResponse {
    statusCode: number
    body: any
}
