import { DoesMatchStringRule } from "../../../src/seedwork/rules/doesMatchStringRule";

describe('DoesMatchStringRule', () => {
    describe('check', () => {
        it('should return unsuccessful result with correct error message when parameter value does not match', () => {
            const rule = new DoesMatchStringRule('test');
            const result = rule.check('test2');
            expect(result.isSuccess).toBe(false);
            expect(result.errorMessage).toBe(`string does not match the value of test`);
        });

        it('should return successful result when parameter parameter value does match', () => {
            const rule = new DoesMatchStringRule('test');
            const result = rule.check('test');
            expect(result.isSuccess).toBe(true);
        });
    })
});