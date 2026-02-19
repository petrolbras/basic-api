export class AppError extends Error {
    constructor (
        public message: string,
        public statusCode: number
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype)
    }
}