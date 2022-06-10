import { TestCaseRunner } from '../src/testCaseRunner';
import { Bitmap } from '../src/bitmap';
import { IBitmap, IReader, IWriter } from '../src/interfaces';

describe("Test Case Runner", () => {
  let testCaseRunner: TestCaseRunner;
  let readerStub: any;
  let writerStub: any;
  let bitMapStub: any;
  let bitmapCreateSpy: any;

  beforeEach(() => {
    readerStub = jasmine.createSpyObj("reader", ['readLine']);
    writerStub = jasmine.createSpyObj("writer", ['writeLine']);
    bitMapStub = jasmine.createSpyObj("bitmap", ['getDistanceToNearestWhite']);
    bitmapCreateSpy = spyOn(Bitmap, 'create').and.returnValue(bitMapStub);
    testCaseRunner = new TestCaseRunner(readerStub, writerStub);
  });

  it("should throw exception when number of test case is not a number", () => {
    readerStub.readLine.and.returnValue('test');
    expect(() => testCaseRunner.run()).toThrowError('Invalid number of test case');
  });

  it("should throw exception when number of test case is less than one", () => {
    readerStub.readLine.and.returnValue('0');
    expect(() => testCaseRunner.run()).toThrowError('Expected at least one test case');
  });

  it("should throw exception when number of test case is more than 1000", () => {
    readerStub.readLine.and.returnValue('1001');
    expect(() => testCaseRunner.run()).toThrowError('Number of test case can not exceed 1000');
  });

  it("should throw exception when row and column data is more than two items", () => {
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '2 3 4';
    });
    expect(() => testCaseRunner.run()).toThrowError('Invalid input for rows and columns');
  });

  it("should throw exception when number of row is NaN", () => {
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return 't 3';
    });
    expect(() => testCaseRunner.run()).toThrowError('Invalid number of rows');
  });

  it("should throw exception when number of row is less than 1", () => {
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '0 3';
    });
    expect(() => testCaseRunner.run()).toThrowError('At least on row is expected');
  });

  it("should throw exception when number of row is greater than 182", () => {
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '183 3';
    });
    expect(() => testCaseRunner.run()).toThrowError('Number of rows can not exceed 182');
  });

  it("should throw exception when number of column is NaN", () => {
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '1 t';
    });
    expect(() => testCaseRunner.run()).toThrowError('Invalid number of columns');
  });

  it("should throw exception when number of column is less than 1", () => {
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '1 0';
    });
    expect(() => testCaseRunner.run()).toThrowError('At least on column is expected');
  });

  it("should throw exception when number of column is greater than 182", () => {
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '1 183';
    });
    expect(() => testCaseRunner.run()).toThrowError('Number of columns can not exceed 182');
  });

  it("should throw exception when row data size does not match number of columns", () => {
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '1 1';
      if (numberOfCall == 3)
        return '11';
    });
    expect(() => testCaseRunner.run()).toThrowError('Row data does not match column length');
  });

  it("should throw error when test cases are not separated by new line", () => {
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
        return '\t';
      
    });

    expect(() => testCaseRunner.run()).toThrowError('Every test case should be separated by a empty new line');
  });

  it("should call bitmap creation method with valid arguments when all inputs are valid", () => {
    bitMapStub.getDistanceToNearestWhite.and.returnValue([[1]]);
    let numberOfCall = 0;
    readerStub.readLine.and.callFake(() => {
      numberOfCall++;
      if (numberOfCall == 1)
        return '1';
      if (numberOfCall == 2)
        return '1 1';
      if (numberOfCall == 3)
        return '1';
      if (numberOfCall == 4)
        return '';
    });

    const result: string[] = [];
    writerStub.writeLine.and.callFake(line => result.push(line));
    testCaseRunner.run();
    expect(bitmapCreateSpy).toHaveBeenCalledTimes(1);
    expect(bitmapCreateSpy).toHaveBeenCalledWith([[1]]);
  });

  it("should print valid result for each test when all inputs are valid", () => {
    
    bitMapStub.getDistanceToNearestWhite.and.returnValue([[6, 7], [8, 9]]);
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
    });

    const result: string[] = [];
    writerStub.writeLine.and.callFake(line => result.push(line));
    testCaseRunner.run();
    expect(result).toEqual(['6 7', '8 9', '', '6 7', '8 9', '']);
  });
});