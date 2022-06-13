import { ValueWithInRangeRule } from "../../../src/seedwork/rules/valueWithInRangeRule";

describe('ValueWithInRangeRule', () => {
    describe('check', () => {
        it('should return unsuccessful result with correct error message when parameter value is lower than minimum value', () => {
            const rule = new ValueWithInRangeRule(1, 5);
            const result = rule.check(0);
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`value is not with in the range of 1 and 5`);
        });

        it('should return unsuccessful result with correct error message when parameter value is higher than maximum value', () => {
            const rule = new ValueWithInRangeRule(1, 5);
            const result = rule.check(6);
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`value is not with in the range of 1 and 5`);
        });

        it('should return successful result when parameter value is with in range', () => {
            const rule = new ValueWithInRangeRule(1, 5);
            const result = rule.check(2);
            expect(result.isSuccess).toBe(true);
        });

        it('should return successful result when parameter value equals minimum value', () => {
            const rule = new ValueWithInRangeRule(1, 5);
            const result = rule.check(1);
            expect(result.isSuccess).toBe(true);
        });

        it('should return successful result when parameter value equals maximum value', () => {
            const rule = new ValueWithInRangeRule(1, 5);
            const result = rule.check(5);
            expect(result.isSuccess).toBe(true);
        });
    })
});