export interface HttpRequest {
    body?: any
    query?: any
    headers?: any
}

export interface HttpResponse {
    statusCode: number
    body: any
}
