import { ArrayIsNotEmptyRule } from "../../../src/seedwork/rules/arrayIsNotEmptyRule";

describe('ArrayIsNotEmpty', () => {
    describe('check', () => {
        it('should return unsuccessful result with correct error message when parameter is empty array', () => {
            const rule = new ArrayIsNotEmptyRule();
            const result = rule.check([]);
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`array can not be empty`);
        });

        it('should return successful result when parameter array has items', () => {
            const rule = new ArrayIsNotEmptyRule();
            const result = rule.check([2]);
            expect(result.isSuccess).toBe(true);
        });
    })
});