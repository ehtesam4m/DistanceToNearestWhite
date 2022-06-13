import { ArrayHasLengthRule } from "../../../src/seedwork/rules/arrayHasLengthRule";

describe('ArrayHasLengthRule', () => {
    describe('check', () => {
        it('should return unsuccessful result with correct error message when parameter array length does not match', () => {
            const rule = new ArrayHasLengthRule(2);
            const result = rule.check([1]);
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`length does not match expected length of 2`);
        });

        it('should return successful result when parameter array length matches', () => {
            const rule = new ArrayHasLengthRule(2);
            const result = rule.check([1, 2]);
            expect(result.isSuccess).toBe(true);
        });
    })
});