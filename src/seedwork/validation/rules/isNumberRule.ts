import { IRule } from "../../interfaces";
import { Result } from "../../result";

export class IsNumberRule implements IRule<number>
{
    public check(value: number): Result {
        if (Number.isNaN(value))
            return Result.fail('Not a number');
        return Result.ok();
    }
}