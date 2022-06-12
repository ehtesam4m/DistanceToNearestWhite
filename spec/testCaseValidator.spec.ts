import { TestCaseValidator } from '../src/testCaseValidator';
import { Result } from '../src/seedwork/result';
import { IsNumberRule } from '../src/seedwork/rules/isNumberRule';
import { ValueWithInRangeRule } from '../src/seedwork/rules/valueWithInRangeRule';
import { ArrayHasLengthRule } from '../src/seedwork/rules/arrayHasLengthRule';
import { DoesMatchStringRule } from '../src/seedwork/rules/doesMatchStringRule';

fdescribe('Test Case Validator', () => {
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

  it('should return unsuccessful result when testcase number is NaN', () => {
    const value = NaN;
    const result = testCaseValidator.validateNumberOfTestCase(value);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${testCaseNumberErrorMsgPrefix}: ${new IsNumberRule().check(value).errorMessage}`);
  });

  it('should return unsuccessful result with correct error message when testcase number is less than 1', () => {
    const value = 0;
    const result = testCaseValidator.validateNumberOfTestCase(value);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${testCaseNumberErrorMsgPrefix}: ${new ValueWithInRangeRule(1,1000).check(value).errorMessage }`);
  });

  it('should return unsuccessful result with correct error message when testcase number is greater than 1000', () => {
    const value = 1001;
    const result = testCaseValidator.validateNumberOfTestCase(value);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${testCaseNumberErrorMsgPrefix}: ${new ValueWithInRangeRule(1,1000).check(value).errorMessage }`);
  });

  it('should return unsuccessful result with correct error message when rows and column line item length not equals 2', () => {
    const value = [1,2,3];
    const result = testCaseValidator.validateRowsAndCols(value);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${rowAndColsLineErrorMsgPrefix}: ${new ArrayHasLengthRule(2).check(value).errorMessage}` );
  });

  it('should return unsuccessful result with correct error message when number of Rows less than 1', () => {
    const value = [0,1];
    const result = testCaseValidator.validateRowsAndCols(value);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${rowErrorMsgPrefix}: ${new ValueWithInRangeRule(1,182).check(value[0]).errorMessage }` );
  });

  it('should return unsuccessful result with correct error message when number of Rows greater than 182', () => {
    const value = [183,1];
    const result = testCaseValidator.validateRowsAndCols(value);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${rowErrorMsgPrefix}: ${new ValueWithInRangeRule(1,182).check(value[0]).errorMessage }` );
  });

  it('should return unsuccessful result with correct error message when number of Columns less than 1', () => {
    const value = [1,0];
    const result = testCaseValidator.validateRowsAndCols(value);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${colsErrorMsgPrefix}: ${new ValueWithInRangeRule(1,182).check(value[1]).errorMessage }` );
  });

  it('should return unsuccessful result with correct error message when number of Columns greater than 182', () => {
    const value = [1,183];
    const result = testCaseValidator.validateRowsAndCols([1,183]);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${colsErrorMsgPrefix}: ${new ValueWithInRangeRule(1,182).check(value[1]).errorMessage }` );
  });

  it('should return unsuccessful result with correct error message when rowdata length does not match number of columns', () => {
    const value = [1,1,2];
    const numberOfCols = 1;
    const result = testCaseValidator.validateRowData(value, numberOfCols);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${rowDataErrorMsgPrefix}: ${new ArrayHasLengthRule(numberOfCols).check(value).errorMessage }` );
  });

  it('should return unsuccessful result with correct error message when rowdata length does not match number of columns', () => {
    const value = [1,1,2];
    const numberOfCols = 1;
    const result = testCaseValidator.validateRowData(value, numberOfCols);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${rowDataErrorMsgPrefix}: ${new ArrayHasLengthRule(numberOfCols).check(value).errorMessage }` );
  });

  it('should return unsuccessful result with correct error message if new line does not match empty string', () => {
    const value = 'test';
    const result = testCaseValidator.validateEmptyNewline('test');
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${emptyNewLineErrorMsgPrefix}: ${new DoesMatchStringRule('').check(value).errorMessage }` );
  });
});