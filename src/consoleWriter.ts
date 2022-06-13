import { IWriter } from './seedwork/interfaces';

export class ConsoleWriter implements IWriter {
    public writeLine(line: string): void {
        console.log(line);
    }
}