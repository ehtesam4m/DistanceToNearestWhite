import { IRule } from "../../interfaces";
import { Result } from "../../result";
import { ArrayHasLengthRule } from "../rules/arrayHasLengthRule";
import { IsNumberRule } from "../rules/isNumberRule";
import { ValueWithInRangeRule } from "../rules/valueWithInRangeRule";

export class TestCaseValidator {
    public static validateNumberOfTestCase(value: number): Result<number> {
        return this.validate<number>(
            value,
            [new IsNumberRule()],
            'Testcase number validation'
        );
    }

    public static validateRowsAndCols(value: number[]) {
        const lenghValidationResult = this.validateRowsAndColLength(value);
        if (!lenghValidationResult.isSuccess)
            return lenghValidationResult;

        const rowsValidationResult = this.validateRows(value[0]);
        if (!rowsValidationResult.isSuccess)
            return rowsValidationResult;
        
        return this.validateCols(value[1]);
    }

    private static validateRowsAndColLength(value: number[]) {
        return this.validate<number[]>(value,
            [new ArrayHasLengthRule(2)],
            'Rows and columns line item validation'
        );
    }

    private static validateRows(value: number): Result {
       return this.validate<number>(value,
            [new IsNumberRule(),
             new ValueWithInRangeRule(1, 182)],
             'Rows validation'
        );
    }

    private static validateCols(value: number): Result {
        return this.validate<number>(value,
            [new IsNumberRule(),
             new ValueWithInRangeRule(1, 182)],
             'Columns validation'
        );
    }

    private static validate<T>(value: T, rules: IRule<T>[], textToAppend: string): Result<T> {
        for (const item of rules) {
            const ruleResult = item.check(value);
            if (!ruleResult.isSuccess)
                return Result.fail(`${textToAppend}: ${ruleResult.errorMessage}`);
        }
        return Result.ok();
    }

}