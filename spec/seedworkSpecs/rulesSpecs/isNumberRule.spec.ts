import { IsNumberRule } from "../../../src/seedwork/rules/isNumberRule";

describe('IsNumberRule', () => {
    describe('check', () => {
        it('should return unsuccessful result with correct error message when parameter is not a number', () => {
            const rule = new IsNumberRule();
            const result = rule.check(NaN);
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`Not a number`);
        });

        it('should return successful result when parameter is a number', () => {
            const rule = new IsNumberRule();
            const result = rule.check(2);
            expect(result.isSuccess).toBe(true);
        });
    })
});