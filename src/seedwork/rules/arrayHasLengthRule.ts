import { IRule } from "../interfaces";
import { Result } from "../result";

export class ArrayHasLengthRule implements IRule<unknown[]>
{
    constructor(private _length: number) { }

    public check(value: unknown[]): Result {
        if (value.length != this._length)
            return Result.fail(`length does not match expected length of ${this._length}`);
        return Result.ok();
    }
}