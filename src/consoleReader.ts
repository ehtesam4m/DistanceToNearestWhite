import { IReader } from './seedwork/interfaces';
import * as readline from 'readline-sync';

export class ConsoleReader implements IReader {
    public readLine(): string {
        return readline.question('');
    }
}