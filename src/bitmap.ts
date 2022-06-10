import { IBitmap } from './interfaces';

export class Bitmap implements IBitmap {
    private _data: number[][];

    public get data() { return this._data; }

    private constructor() {
        this._data = [];
    }

    public static create(data: number[][]): IBitmap {
        if (!data || data.length == 0)
            throw new Error('Bitmap data can not be empty');

        const numberOfCol = data[0].length;
        const bitMap = new Bitmap();
        let oneFound = false;

        for (let i = 0; i < data.length; i++) {
            this.validateRowData(data[i], numberOfCol, (oneCount) => {
                if (!oneFound && oneCount > 0)
                    oneFound = true;
            });
        }
        if (!oneFound)
            throw new Error('Number of 1s should be at least 1');

        bitMap._data = data;

        return bitMap;
    }

    private static validateRowData(data: number[], numberOfCols: number, process1Count: (numberOfOnes: number) => void) {
        if (data.length != numberOfCols)
            throw new Error('All rows should contain same number of col');

        let numberOfOnes = 0;
        for (const item of data) {
            if (item !== 0 && item !== 1)
                throw new Error('Only 0 and 1 is allowed in bit map');
            if (item === 1)
                numberOfOnes++;
        }
        process1Count(numberOfOnes);
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