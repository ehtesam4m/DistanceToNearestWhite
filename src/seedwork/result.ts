export class Result<T=unknown> {
    public isSuccess: boolean;
    public errorMessage: string;
    private _value: T | null;

    private constructor(isSuccess: boolean, errorMessage?: string, value?: T) {
        this.isSuccess = isSuccess;
        this.errorMessage = errorMessage;
        this._value = value;
    }

    public get value(): T {
        if (!this.isSuccess) {
            return null;
        }
        return this._value;
    }

    public static ok<TResult>(value?: TResult): Result<TResult> {
        return new Result<TResult>(true, null, value);
    }

    public static fail<U>(message: string): Result<U> {
        return new Result<U>(false, message);
    }
}