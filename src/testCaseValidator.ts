import { IRule } from "./seedwork/interfaces";
import { Result } from "./seedwork/result";
import { ArrayHasLengthRule } from "./seedwork/rules/arrayHasLengthRule";
import { DoesMatchStringRule } from "./seedwork/rules/doesMatchStringRule";
import { IsNumberRule } from "./seedwork/rules/isNumberRule";
import { ValueWithInRangeRule } from "./seedwork/rules/valueWithInRangeRule";

export class TestCaseValidator {
    public static validateNumberOfTestCase(value: number): Result {
        return TestCaseValidator.validate<number>(
            value,
            [new IsNumberRule(),
             new ValueWithInRangeRule(1, 1000)],
            'Testcase number'
        );
    }

    public static validateRowsAndCols(value: number[]): Result {
        const lenghValidationResult = TestCaseValidator.validateRowsAndColLength(value);
        if (!lenghValidationResult.isSuccess)
            return lenghValidationResult;

        const rowsValidationResult = TestCaseValidator.validateRows(value[0]);
        if (!rowsValidationResult.isSuccess)
            return rowsValidationResult;
        
        return TestCaseValidator.validateCols(value[1]);
    }

    public static validateRowData(value: number[], numberOfCol: number): Result {
        return TestCaseValidator.validate<number[]>(
            value,
            [new ArrayHasLengthRule(numberOfCol)],
            'Row data'
        );
    }

    public static validateEmptyNewline(value: string): Result {
        return TestCaseValidator.validate<string>(
            value,
            [new DoesMatchStringRule('')],
            'New line after each test case'
        );
    }


    private static validateRowsAndColLength(value: number[]) {
        return TestCaseValidator.validate<number[]>(value,
            [new ArrayHasLengthRule(2)],
            'Rows and columns line items'
        );
    }

    private static validateRows(value: number): Result {
       return TestCaseValidator.validate<number>(value,
            [new IsNumberRule(),
             new ValueWithInRangeRule(1, 182)],
             'Rows'
        );
    }

    private static validateCols(value: number): Result {
        return TestCaseValidator.validate<number>(value,
            [new IsNumberRule(),
             new ValueWithInRangeRule(1, 182)],
             'Columns'
        );
    }

    private static validate<T>(value: T, rules: IRule<T>[], textToAppend: string): Result {
        for (const item of rules) {
            const ruleResult = item.check(value);
            if (!ruleResult.isSuccess)
                return Result.fail(`${textToAppend}: ${ruleResult.errorMessage}`);
        }
        return Result.ok();
    }
}