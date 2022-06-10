import { Bitmap } from "./bitmap";
import { IReader, IWriter, IBitmap } from "./interfaces";

export class TestCaseRunner {
    private _bitMaps: IBitmap[] = [];
    constructor(private _reader: IReader, private _writer: IWriter) { }

    public run(): void {
        const input = this._reader.readLine();
        const numberOfTestCases = parseInt(input);
        this.validateNumberOfTestCase(numberOfTestCases);

        for (let i = 0; i < numberOfTestCases; i++) {

            const rowsAndColsArray = this._reader.readLine().split(' ');
            if (rowsAndColsArray.length != 2)
                throw new Error('Invalid input for rows and columns');
                
            const numberOfRows = parseInt(rowsAndColsArray[0]);
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
                throw new Error("Every test case should be separated by a empty new line");

        }

        for (let i = 0; i < numberOfTestCases; i++) {
            var result = this._bitMaps[i].getDistanceToNearestWhite();
            this.printResult(result);
        }

    }

    private  validateNumberOfTestCase(numberOfTestCases: number) {
        if (Number.isNaN(numberOfTestCases))
            throw new Error("Invalid number of test case");
        if (numberOfTestCases < 1)
            throw new Error("Expected at least one test case");
        if (numberOfTestCases > 1000)
            throw new Error("Number of test case can not exceed 1000");
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
            this._writer.writeLine(result[i].join(" "));
        }
        this._writer.writeLine('');
    }

}