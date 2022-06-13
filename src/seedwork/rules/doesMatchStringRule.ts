import { IRule } from "../interfaces";
import { Result } from "../result";

export class DoesMatchStringRule implements IRule<string>
{
    constructor(private _valueToMatch: string) { }

    public check(value: string): Result {
        if (value != this._valueToMatch)
            return Result.fail(`string does not match the value of ${this._valueToMatch}`);
        return Result.ok();
    }
}