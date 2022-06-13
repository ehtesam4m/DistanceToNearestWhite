import { TestCaseRunner } from '../src/testCaseRunner';
import { Bitmap } from '../src/bitmap';
import { IBitmap, IReader, IWriter, ITestCaseValidator } from '../src/seedwork/interfaces';
import { Result } from '../src/seedwork/result';

describe('Test Case Runner', () => {
  let testCaseRunner: TestCaseRunner;
  let readerStub: jasmine.SpyObj<IReader>;
  let writerStub: jasmine.SpyObj<IWriter>;
  let bitMapStub: jasmine.SpyObj<IBitmap>;
  let testCaseValidatorStub: jasmine.SpyObj<ITestCaseValidator>;
  let bitmapCreateSpy: jasmine.Spy<(data: number[][]) => Result<IBitmap>>;
  const errorPrefix = 'Test case runner error: ';

  beforeEach(() => {
    readerStub = jasmine.createSpyObj('reader', ['readLine']);
    writerStub = jasmine.createSpyObj('writer', ['writeLine']);
    bitMapStub = jasmine.createSpyObj('bitmap', ['getDistanceToNearestWhite']);
    testCaseValidatorStub = jasmine.createSpyObj('testCaseValidator', ['validateNumberOfTestCase', 'validateRowsAndCols', 'validateRowData', 'validateEmptyNewline']);
    bitmapCreateSpy = spyOn(Bitmap, 'create').and.returnValue(Result.ok(bitMapStub));
    testCaseRunner = new TestCaseRunner(readerStub, writerStub, testCaseValidatorStub);
  });


  it('should return result with correct error message when testcase number validation fails', () => {
    const errorMessage = 'testcase number error';
    readerStub.readLine.and.returnValue('2');
    testCaseValidatorStub.validateNumberOfTestCase.and.returnValue(Result.fail(errorMessage));

    const result = testCaseRunner.run();

    expect(testCaseValidatorStub.validateNumberOfTestCase).toHaveBeenCalledWith(2);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${errorPrefix}${errorMessage}`);
  });

  it('should return result with correct error message when rows and cols validation fails but test case number validation is successful', () => {
    const errorMessage = 'rows and columns error';
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '2 3';
      return '';
    });
    testCaseValidatorStub.validateNumberOfTestCase.and.returnValue(Result.ok());
    testCaseValidatorStub.validateRowsAndCols.and.returnValue(Result.fail(errorMessage));

    const result = testCaseRunner.run();

    expect(testCaseValidatorStub.validateRowsAndCols).toHaveBeenCalledWith([2, 3]);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${errorPrefix}${errorMessage}`);
  });

  it('should return result with correct error message when row data validation fails but testcase number and rows and cols validation is successful', () => {
    const errorMessage = 'rows data error';
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '1 2';
      if (numberOfCall == 3)
        return '10';
      return '';
    });
    testCaseValidatorStub.validateNumberOfTestCase.and.returnValue(Result.ok());
    testCaseValidatorStub.validateRowsAndCols.and.returnValue(Result.ok());
    testCaseValidatorStub.validateRowData.and.returnValue(Result.fail(errorMessage));

    const result = testCaseRunner.run();

    expect(testCaseValidatorStub.validateRowData).toHaveBeenCalledWith([1, 0], 2);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${errorPrefix}${errorMessage}`);
  });

  it('should return result with correct error message when bitmap data validation fails', () => {
    const errorMessage = 'bitmap create error';
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '1 2';
      if (numberOfCall == 3)
        return '10';
      return '';
    });
    testCaseValidatorStub.validateNumberOfTestCase.and.returnValue(Result.ok());
    testCaseValidatorStub.validateRowsAndCols.and.returnValue(Result.ok());
    testCaseValidatorStub.validateRowData.and.returnValue(Result.ok());
    bitmapCreateSpy.and.returnValue(Result.fail(errorMessage));

    const result = testCaseRunner.run();

    expect(bitmapCreateSpy).toHaveBeenCalledWith([[1, 0]]);
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${errorPrefix}${errorMessage}`);
  });

  it('should return result with correct error message when empty newline not found after each test case', () => {
    const errorMessage = 'new line validation';
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '1 2';
      if (numberOfCall == 3)
        return '10';
      if (numberOfCall == 4)
        return '\t';
      return '';
    });
    testCaseValidatorStub.validateNumberOfTestCase.and.returnValue(Result.ok());
    testCaseValidatorStub.validateRowsAndCols.and.returnValue(Result.ok());
    testCaseValidatorStub.validateRowData.and.returnValue(Result.ok());
    bitmapCreateSpy.and.returnValue(Result.ok(bitMapStub));
    testCaseValidatorStub.validateEmptyNewline.and.returnValue(Result.fail(errorMessage));

    const result = testCaseRunner.run();

    expect(testCaseValidatorStub.validateEmptyNewline).toHaveBeenCalledWith('\t');
    expect(result.isSuccess).toBe(false);
    expect(result.errorMessage).toBe(`${errorPrefix}${errorMessage}`);
  });

  it('should write valid result for each test case and return success result when all inputs are valid', () => {


    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '2';
      if (numberOfCall == 2)
        return '1 1';
      if (numberOfCall == 3)
        return '1';
      if (numberOfCall == 4)
        return '';
      if (numberOfCall == 5)
        return '1 1';
      if (numberOfCall == 6)
        return '1';
      if (numberOfCall == 7)
        return '';
      return '';
    });

    testCaseValidatorStub.validateNumberOfTestCase.and.returnValue(Result.ok());
    testCaseValidatorStub.validateRowsAndCols.and.returnValue(Result.ok());
    testCaseValidatorStub.validateRowData.and.returnValue(Result.ok());
    bitmapCreateSpy.and.returnValue(Result.ok(bitMapStub));
    testCaseValidatorStub.validateEmptyNewline.and.returnValue(Result.ok());
    bitMapStub.getDistanceToNearestWhite.and.returnValue([[6, 7], [8, 9]]);

    const result: string[] = [];
    writerStub.writeLine.and.callFake(line => result.push(line));
    testCaseRunner.run();
    expect(result).toEqual(['6 7', '8 9', '', '6 7', '8 9', '']);
  });
});