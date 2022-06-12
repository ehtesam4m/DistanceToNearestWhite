import { Bitmap } from './bitmap';
import { IReader, IWriter, IBitmap } from './seedwork/interfaces';
import { Result } from './seedwork/result';
import { TestCaseValidator } from './testCaseValidator';

export class TestCaseRunner {
    private _bitMaps: IBitmap[] = [];
    constructor(private _reader: IReader, private _writer: IWriter) { }

    public run(): void {
        const readResult = this.readTestCases();
        if (!readResult.isSuccess) {
            this._writer.writeLine('Error: '+ readResult.errorMessage);
            return;
        }
        this.showResults();
    }

    private readTestCases(): Result {
        const testCaseReadResult = this.readNumberOfTestCases();
        if (!testCaseReadResult.isSuccess)
            return testCaseReadResult;

        for (let i = 0; i < testCaseReadResult.value; i++) {
            const rowsAndColsReadResult = this.readNumberOfRowsAndColumns();
            if (!rowsAndColsReadResult.isSuccess)
                return rowsAndColsReadResult;

            const numberOfRows = rowsAndColsReadResult.value[0];
            const numberOfCols = rowsAndColsReadResult.value[1];

            const data: number[][] = [];
            for (let i = 0; i < numberOfRows; i++) {
                const rowDataReadResult = this.readRowData(numberOfCols);
                if (!rowDataReadResult.isSuccess)
                    return rowsAndColsReadResult;
                data.push(rowsAndColsReadResult.value);
            }

            const bitMapCreationResult = Bitmap.create(data);
            if(!bitMapCreationResult.isSuccess)
                return bitMapCreationResult;
            this._bitMaps.push(bitMapCreationResult.value);

            const newLineReadResult = this.readEmptyNewLine();
            if (!newLineReadResult.isSuccess)
                return newLineReadResult
        }
        return Result.ok();
    }

    private showResults(): void {
        for (const item of this._bitMaps) {
            const result = item.getDistanceToNearestWhite();
            this.printResult(result);
        }
    }

    private readNumberOfTestCases(): Result<number> {
        const value = parseInt(this._reader.readLine());
        const validationResult = TestCaseValidator.validateNumberOfTestCase(value);
        if (!validationResult.isSuccess)
            return Result.fail<number>(validationResult.errorMessage);
        return Result.ok(value);
    }

    private readNumberOfRowsAndColumns(): Result<number[]> {
        const value = this._reader.readLine().split(' ').map(x => parseInt(x));
        const validationResult = TestCaseValidator.validateRowsAndCols(value);
        if (validationResult.isSuccess)
            return Result.fail<number[]>(validationResult.errorMessage)
        return Result.ok(value);

    }

    private readRowData(numberOfCol: number): Result<number[]> {
        const value = this._reader.readLine().split('').map(x => parseInt(x));
        const validationResult = TestCaseValidator.validateRowData(value, numberOfCol);
        if (validationResult.isSuccess)
            return Result.fail<number[]>(validationResult.errorMessage)
        return Result.ok(value);
    }

    private readEmptyNewLine(): Result {
        const value = this._reader.readLine();
        const validationResult = TestCaseValidator.validateEmptyNewline(value);
        if (validationResult.isSuccess)
            return Result.fail<string>(validationResult.errorMessage)
        return Result.ok();
    }


    private printResult(result: number[][]) {
        for (let i = 0; i < result.length; i++) {
            this._writer.writeLine(result[i].join(' '));
        }
        this._writer.writeLine('');
    }
}