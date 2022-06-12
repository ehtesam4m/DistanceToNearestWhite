import { IBitmap } from './seedwork/interfaces';
import { Result } from './seedwork/result';
import { ArrayHasLengthRule } from './seedwork/rules/arrayHasLengthRule';
import { ArrayIsNotEmptyRule } from './seedwork/rules/arrayIsNotEmptyRule';

export class Bitmap implements IBitmap {
    private _data: number[][];

    public get data() { return this._data; }

    private constructor() {
        this._data = [];
    }

    public static create(data: number[][]): Result<IBitmap> {
        const dataEmptyResultCheck = new ArrayIsNotEmptyRule().check(data);
        if(!dataEmptyResultCheck.isSuccess)
            return Result.fail(`Bitmap data: ${dataEmptyResultCheck.errorMessage}`);

        const numberOfCol = data[0].length;
        const bitMap = new Bitmap();
        let oneFound = false;

        for (let i = 0; i < data.length; i++) {
            const rowDataValidationResult = this.validateRowData(data[i], numberOfCol, (oneCount) => {
                if (!oneFound && oneCount > 0)
                    oneFound = true;
            });
            if(!rowDataValidationResult.isSuccess)
                return Result.fail(`${rowDataValidationResult.errorMessage}`);
        }
        if (!oneFound)
            return Result.fail(`Number of 1s should be at least 1`);

        bitMap._data = data;

        return Result.ok(bitMap);
    }

    private static validateRowData(data: number[], numberOfCols: number, process1Count: (numberOfOnes: number) => void): Result {
        const columnLengthCheckResult =  new ArrayHasLengthRule(numberOfCols).check(data);
        if (!columnLengthCheckResult.isSuccess)
        return Result.fail(`Bitmap column data: ${columnLengthCheckResult.errorMessage}`);

        let numberOfOnes = 0;
        for (const item of data) {
            if (item !== 0 && item !== 1)
            return Result.fail(`Only 0 and 1 is allowed in bit map`);
            if (item === 1)
                numberOfOnes++;
        }
        process1Count(numberOfOnes);
        return Result.ok();
    }

    public getDistanceToNearestWhite(): number[][] {
        const rows = this._data.length;
        const cols = this._data[0].length;

        const result: number[][] = [];

        for (let i = 0; i < rows; i++) {
            const rowData: number[] = [];
            for (let j = 0; j < cols; j++) {
                rowData.push(cols + rows);
            }
            result.push(rowData);
        }

        // TOP-LEFT
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (this._data[i][j] == 1) {
                    result[i][j] = 0;
                }
                else {
                    if (i > 0) {
                        result[i][j] = Math.min(result[i][j], result[i - 1][j] + 1);
                    }
                    if (j > 0) {
                        result[i][j] = Math.min(result[i][j], result[i][j - 1] + 1);
                    }
                }
            }
        }

        // BOTTOM-RIGHT
        for (let i = rows - 1; i >= 0; i--) {
            for (let j = cols - 1; j >= 0; j--) {
                if (this._data[i][j] == 1) {
                    result[i][j] = 0;
                }
                else {
                    if (i < rows - 1) {
                        result[i][j] = Math.min(result[i][j], result[i + 1][j] + 1);
                    }
                    if (j < cols - 1) {
                        result[i][j] = Math.min(result[i][j], result[i][j + 1] + 1);
                    }
                }
            }
        }
        return result;
    }
}