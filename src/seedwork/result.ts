export class Result<T=unknown> {
    public isSuccess: boolean;
    public error: Error;
    private _value: T | null;

    private constructor(isSuccess: boolean, error?: Error, value?: T) {
        this.isSuccess = isSuccess;
        this.error = error;
        this._value = value;
    }

    public get Value(): T {
        if (!this.isSuccess) {
            return null;
        }
        return this._value;
    }

    public static ok<TResult>(value?: TResult): Result<TResult> {
        return new Result<TResult>(true, null, value);
    }

    public static fail<U>(message: string): Result<U> {
        return new Result<U>(false, new Error(message));
    }
}