import { IRule } from "../../interfaces";
import { Result } from "../../result";

export class ValueWithInRangeRule implements IRule<number>
{
    constructor(private _min: number, private _max: number) { }

    public check(value: number): Result {
        if (value >= this._min && value <= this._max)
            return Result.ok();
        return Result.fail(`value is not with in the range of ${this._min} and ${this._max}`);
    }
}