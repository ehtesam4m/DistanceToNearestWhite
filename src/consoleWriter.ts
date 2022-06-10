import { IWriter } from "./interfaces";

export class ConsoleWriter implements IWriter {
    public writeLine(line: string): void {
        console.log(line);
    }
}