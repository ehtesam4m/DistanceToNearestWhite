import { Result } from "./result";


export interface IReader {
    readLine(): string;
}

export interface IWriter {
    writeLine(line: string): void;
}

export interface IBitmap {
    get data(): number[][];
    getDistanceToNearestWhite(): number[][];
}

export interface IRule<T> {
    check(value: T): Result
}

export interface ITestCaseValidator {
    validateNumberOfTestCase(value: number): Result
    validateRowsAndCols(value: number[]): Result
    validateRowData(value: number[], numberOfCol: number): Result
    validateEmptyNewline(value: string): Result
}