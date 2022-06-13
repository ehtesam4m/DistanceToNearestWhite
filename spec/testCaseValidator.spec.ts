import { TestCaseValidator } from '../src/testCaseValidator';
import { IsNumberRule } from '../src/seedwork/rules/isNumberRule';
import { ValueWithInRangeRule } from '../src/seedwork/rules/valueWithInRangeRule';
import { ArrayHasLengthRule } from '../src/seedwork/rules/arrayHasLengthRule';
import { DoesMatchStringRule } from '../src/seedwork/rules/doesMatchStringRule';

describe('Test Case Validator', () => {
  let testCaseValidator: TestCaseValidator;
  const testCaseNumberErrorMsgPrefix = 'Testcase number';
  const rowAndColsLineErrorMsgPrefix = 'Rows and columns line items';
  const rowErrorMsgPrefix = 'Rows';
  const colsErrorMsgPrefix = 'Columns';
  const rowDataErrorMsgPrefix = 'Row data';
  const emptyNewLineErrorMsgPrefix = 'New line after each test case';

  beforeEach(() => {
    testCaseValidator = new TestCaseValidator();
  });
  describe('Validate Test Case Number', () => {
    it('should return unsuccessful result when testcase number is NaN', () => {
      const value = NaN;
      const result = testCaseValidator.validateNumberOfTestCase(value);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${testCaseNumberErrorMsgPrefix}: ${new IsNumberRule().check(value).errorMessage}`);
    });

    it('should return successful result when testcase number is a number', () => {
      const value = 2;
      const result = testCaseValidator.validateNumberOfTestCase(value);
      expect(result.isSuccess).toBe(true);
    });

    it('should return unsuccessful result with correct error message when testcase number is less than 1', () => {
      const value = 0;
      const result = testCaseValidator.validateNumberOfTestCase(value);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${testCaseNumberErrorMsgPrefix}: ${new ValueWithInRangeRule(1, 1000).check(value).errorMessage}`);
    });

    it('should return unsuccessful result with correct error message when testcase number is greater than 1000', () => {
      const value = 1001;
      const result = testCaseValidator.validateNumberOfTestCase(value);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${testCaseNumberErrorMsgPrefix}: ${new ValueWithInRangeRule(1, 1000).check(value).errorMessage}`);
    });

    it('should return successful result when testcase number is with in 1 and 1000', () => {
      const value = 800;
      const result = testCaseValidator.validateNumberOfTestCase(value);
      expect(result.isSuccess).toBe(true);
    });
  })

  describe('Validate rows and columns number', () => {
    it('should return unsuccessful result with correct error message when rows and column line item length not equals 2', () => {
      const value = [1, 2, 3];
      const result = testCaseValidator.validateRowsAndCols(value);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${rowAndColsLineErrorMsgPrefix}: ${new ArrayHasLengthRule(2).check(value).errorMessage}`);
    });

    it('should return successful result when rows and column line item length equals 2', () => {
      const value = [1, 2];
      const result = testCaseValidator.validateRowsAndCols(value);
      expect(result.isSuccess).toBe(true);
    });

    it('should return unsuccessful result with correct error message when number of Rows less than 1', () => {
      const value = [0, 1];
      const result = testCaseValidator.validateRowsAndCols(value);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${rowErrorMsgPrefix}: ${new ValueWithInRangeRule(1, 182).check(value[0]).errorMessage}`);
    });

    it('should return unsuccessful result with correct error message when number of Rows greater than 182', () => {
      const value = [183, 1];
      const result = testCaseValidator.validateRowsAndCols(value);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${rowErrorMsgPrefix}: ${new ValueWithInRangeRule(1, 182).check(value[0]).errorMessage}`);
    });

    it('should return unsuccessful result with correct error message when number of Columns less than 1', () => {
      const value = [1, 0];
      const result = testCaseValidator.validateRowsAndCols(value);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${colsErrorMsgPrefix}: ${new ValueWithInRangeRule(1, 182).check(value[1]).errorMessage}`);
    });

    it('should return unsuccessful result with correct error message when number of Columns greater than 182', () => {
      const value = [1, 183];
      const result = testCaseValidator.validateRowsAndCols([1, 183]);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${colsErrorMsgPrefix}: ${new ValueWithInRangeRule(1, 182).check(value[1]).errorMessage}`);
    });

    it('should return successful result when rows and cols are with in the range of 1 to 182', () => {
      const value = [2, 5];
      const result = testCaseValidator.validateRowsAndCols(value);
      expect(result.isSuccess).toBe(true);
    });
  })
  describe('Validate rows data', () => {
    it('should return unsuccessful result with correct error message when rowdata length does not match number of columns', () => {
      const value = [1, 1, 2];
      const numberOfCols = 1;
      const result = testCaseValidator.validateRowData(value, numberOfCols);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${rowDataErrorMsgPrefix}: ${new ArrayHasLengthRule(numberOfCols).check(value).errorMessage}`);
    });

    it('should return successful result when rowdata length match number of columns', () => {
      const value = [1, 1];
      const numberOfCols = 2;
      const result = testCaseValidator.validateRowData(value, numberOfCols);
      expect(result.isSuccess).toBe(true);
    });
  });

  describe('Validate new line after each test case', () => {
    it('should return unsuccessful result with correct error message if new line does not match empty string', () => {
      const value = 'test';
      const result = testCaseValidator.validateEmptyNewline(value);
      expect(result.isSuccess).toBe(false);
      expect(result.errorMessage).toBe(`${emptyNewLineErrorMsgPrefix}: ${new DoesMatchStringRule('').check(value).errorMessage}`);
    });

    it('should return successful result when new line does match empty string', () => {
      const result = testCaseValidator.validateEmptyNewline('');
      expect(result.isSuccess).toBe(true);
    });
  });
});