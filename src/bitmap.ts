import { IBitmap } from "./interfaces";

export class Bitmap implements IBitmap{
    private _data: number[][];

    public get data() { return this._data; }

    private constructor() {
        this._data = [];
    }

    public static create(data: number[][]): IBitmap {
        if(!data || data.length == 0)
            throw new Error('Bitmap data can not be empty');
        
        const numberOfCol = data[0].length;
        const bitMap = new Bitmap();
        for (let i = 0; i < data.length; i++) {
            this.validateRowData(data[i], numberOfCol);
        }
        bitMap._data = data;

        return bitMap;
    }

    private static validateRowData(data: number[], numberOfCols: number) {
        if(data.length != numberOfCols)
            throw new Error('All rows should contain same number of col');
        let oneCount: number = 0;
        for (let item of data) {
            if (item !== 0 && item !== 1)
                throw new Error('Only 0 and 1 is allowed in bit map');
            if (item === 1)
                oneCount++;
        }
        if (oneCount == 0)
            throw new Error('Number of 1s should be at least 1');
    }

    public getDistanceToNearestWhite(): number[][] {
        const rows = this._data.length;
        const cols = this._data[0].length;

        const result: number[][] = [];

        for (var i = 0; i < rows; i++) {
            const rowData: number[] = [];
            for (var j = 0; j < cols; j++) {
                rowData.push(cols + rows);
            }
            result.push(rowData);
        }

        // TOP-LEFT
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
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
        for (var i = rows - 1; i >= 0; i--) {
            for (var j = cols - 1; j >= 0; j--) {
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