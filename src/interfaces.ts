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