export class ApiError extends Error {
    public statusCode: number
    public reason: string

    constructor(statusCode: number, reason: string) {
        super();
        this.statusCode = statusCode
        this.reason = reason
    }
}