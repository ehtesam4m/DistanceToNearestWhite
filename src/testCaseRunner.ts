import { Bitmap } from './bitmap';
import { IReader, IWriter, IBitmap } from './seedwork/interfaces';
import { Result } from './seedwork/result';
import { TestCaseValidator } from './seedwork/validation/validators/testCaseValidator';

export class TestCaseRunner {
    private _bitMaps: IBitmap[] = [];
    constructor(private _reader: IReader, private _writer: IWriter) { }

    public run(): Result {
        
        const testCaseReadResult = this.ReadNumberOfTestCases();
        if(!testCaseReadResult.isSuccess)
            return testCaseReadResult;
        

        for (let i = 0; i < testCaseReadResult.Value; i++) {

            const rowsAndColsReadResult = this.readNumberOfRowsAndColumns();
            if(!rowsAndColsReadResult.isSuccess)
                return rowsAndColsReadResult;
                
            const numberOfRows = parseInt(rowsAndColsReadResult.value[0]);
            const numberOfCols = parseInt(rowsAndColsArray[1]);
            this.validateNumberOfRows(numberOfRows);
            this.validateNumberOfColumns(numberOfCols);

            
            const data: number[][] = [];
            for(let i=0; i< numberOfRows; i++)
            {
                const rowData = this._reader.readLine().split('').map(x=> parseInt(x));
                this.validateRowData(rowData, numberOfCols);
                data.push(rowData);
            }

            const bitMap = Bitmap.create(data);
            this._bitMaps.push(bitMap);

            const newLine = this._reader.readLine();
            if (newLine != '')
                throw new Error('Every test case should be separated by a empty new line');

        }

        for (let i = 0; i < numberOfTestCases; i++) {
            const result = this._bitMaps[i].getDistanceToNearestWhite();
            this.printResult(result);
        }

    }

    private readNumberOfTestCases(): Result<number> {
        const value = parseInt(this._reader.readLine());
        const validationResult = TestCaseValidator.validateNumberOfTestCase(value);
        if(!validationResult.isSuccess)
            return validationResult;
        return Result.ok(value);
    }

    private readNumberOfRowsAndColumns(): Result<number[]> {
        const value = this._reader.readLine().split(' ').map(x=> parseInt(x));
        const validationResult = TestCaseValidator.validateRowsAndCols(value);
        if(validationResult.isSuccess)
            return validationResult
        return Result.ok(value);

    }



    private static validation

    private  validateNumberOfTestCase(numberOfTestCases: number): Result<string> {
        let errorMessage: string = '';
        if (Number.isNaN(numberOfTestCases))
            throw new Error('Invalid number of test case');
        if (numberOfTestCases < 1)
            throw new Error('Expected at least one test case');
        if (numberOfTestCases > 1000)
            throw new Error('Number of test case can not exceed 1000');
    }

    private  validateNumberOfRows(numberOfRows: number) {
        if (Number.isNaN(numberOfRows))
            throw new Error('Invalid number of rows');
        if (numberOfRows < 1)
            throw new Error('At least on row is expected');
        if (numberOfRows > 182)
            throw new Error('Number of rows can not exceed 182');
    }

    private  validateNumberOfColumns(numberOfCols: number) {
        if (Number.isNaN(numberOfCols))
            throw new Error('Invalid number of columns');
        if (numberOfCols < 1)
            throw new Error('At least on column is expected');
        if (numberOfCols > 182)
            throw new Error('Number of columns can not exceed 182');
    }

    private validateRowData(data: number[], numberOfCols: number) {
        if(data.length != numberOfCols)
            throw new Error('Row data does not match column length');
    }


    private printResult(result: number[][]) {
        for (let i = 0; i < result.length; i++) {
            this._writer.writeLine(result[i].join(' '));
        }
        this._writer.writeLine('');
    }
}