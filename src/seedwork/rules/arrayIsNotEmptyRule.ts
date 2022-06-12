import { IRule } from "../interfaces";
import { Result } from "../result";

export class ArrayIsNotEmptyRule implements IRule<unknown[]>
{
    public check(value: unknown[]): Result {
        if (!value || value.length == 0)
            return Result.fail('array can not be empty');
        return Result.ok();
    }
}