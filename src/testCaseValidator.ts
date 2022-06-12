import { IRule, ITestCaseValidator } from "./seedwork/interfaces";
import { Result } from "./seedwork/result";
import { ArrayHasLengthRule } from "./seedwork/rules/arrayHasLengthRule";
import { DoesMatchStringRule } from "./seedwork/rules/doesMatchStringRule";
import { IsNumberRule } from "./seedwork/rules/isNumberRule";
import { ValueWithInRangeRule } from "./seedwork/rules/valueWithInRangeRule";

export class TestCaseValidator implements ITestCaseValidator {
    public validateNumberOfTestCase(value: number): Result {
        return this.validate<number>(
            value,
            [new IsNumberRule(),
            new ValueWithInRangeRule(1, 1000)],
            'Testcase number'
        );
    }

    public validateRowsAndCols(value: number[]): Result {
        const lenghValidationResult = this.validateRowsAndColLength(value);
        if (!lenghValidationResult.isSuccess)
            return lenghValidationResult;

        const rowsValidationResult = this.validateRows(value[0]);
        if (!rowsValidationResult.isSuccess)
            return rowsValidationResult;

        return this.validateCols(value[1]);
    }

    public validateRowData(value: number[], numberOfCol: number): Result {
        return this.validate<number[]>(
            value,
            [new ArrayHasLengthRule(numberOfCol)],
            'Row data'
        );
    }

    public validateEmptyNewline(value: string): Result {
        return this.validate<string>(
            value,
            [new DoesMatchStringRule('')],
            'New line after each test case'
        );
    }


    private validateRowsAndColLength(value: number[]) {
        return this.validate<number[]>(value,
            [new ArrayHasLengthRule(2)],
            'Rows and columns line items'
        );
    }

    private validateRows(value: number): Result {
        return this.validate<number>(value,
            [new IsNumberRule(),
            new ValueWithInRangeRule(1, 182)],
            'Rows'
        );
    }

    private validateCols(value: number): Result {
        return this.validate<number>(value,
            [new IsNumberRule(),
            new ValueWithInRangeRule(1, 182)],
            'Columns'
        );
    }

    private validate<T>(value: T, rules: IRule<T>[], textToAppend: string): Result {
        for (const item of rules) {
            const ruleResult = item.check(value);
            if (!ruleResult.isSuccess)
                return Result.fail(`${textToAppend}: ${ruleResult.errorMessage}`);
        }
        return Result.ok();
    }
}