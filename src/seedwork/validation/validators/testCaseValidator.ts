import { IRule } from "../../interfaces";
import { Result } from "../../result";
import { IsNumberRule } from "../rules/isNumberRule";

export class TestCaseValidator {
    public static ValidateTestCase(value: number) {
        return this.Validate<number>(
            value,
            [new IsNumberRule()]
        );
    }

    public static Validate<T>(value: T, rules: IRule<T>[]): Result<T> {
        for (const item of rules) {
            const ruleResult = item.check(value);
            if (!ruleResult.isSuccess)
                return ruleResult
        }
    }

}