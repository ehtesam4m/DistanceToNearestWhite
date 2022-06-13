import { Bitmap } from './bitmap';
import { IReader, IWriter, IBitmap, ITestCaseValidator } from './seedwork/interfaces';
import { Result } from './seedwork/result';

export class TestCaseRunner {
    private _bitMaps: IBitmap[] = [];
    constructor(private _reader: IReader, private _writer: IWriter, private _validator: ITestCaseValidator) { }

    public run(): Result {
        const readResult = this.readTestCases();
        if (!readResult.isSuccess) {
            return Result.fail('Test case runner error: ' + readResult.errorMessage);
        }
        this.showResults();
        return Result.ok();
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
                    return rowDataReadResult;
                data.push(rowDataReadResult.value);
            }

            const bitMapCreationResult = Bitmap.create(data);
            if (!bitMapCreationResult.isSuccess)
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

    private validateData<T>(value: T, validate: () => Result): Result<T> {
        const validationResult = validate();
        if (!validationResult.isSuccess)
            return Result.fail<T>(validationResult.errorMessage);
        return Result.ok(value);
    }

    private readNumberOfTestCases(): Result<number> {
        const value = parseInt(this._reader.readLine());
        return this.validateData(value, () => this._validator.validateNumberOfTestCase(value));
    }

    private readNumberOfRowsAndColumns(): Result<number[]> {
        const value = this._reader.readLine().split(' ').map(x => parseInt(x));
        return this.validateData(value, () => this._validator.validateRowsAndCols(value));

    }

    private readRowData(numberOfCol: number): Result<number[]> {
        const value = this._reader.readLine().split('').map(x => parseInt(x));
        return this.validateData(value, () => this._validator.validateRowData(value, numberOfCol));
    }

    private readEmptyNewLine(): Result {
        const value = this._reader.readLine();
        return this.validateData(value, () => this._validator.validateEmptyNewline(value));
    }

    private printResult(result: number[][]) {
        for (let i = 0; i < result.length; i++) {
            this._writer.writeLine(result[i].join(' '));
        }
        this._writer.writeLine('');
    }
}