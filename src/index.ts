import { ConsoleReader } from './consoleReader';
import { ConsoleWriter } from './consoleWriter';
import { TestCaseRunner } from './testCaseRunner';
import { TestCaseValidator } from './testCaseValidator';

console.log('Started');

try {
    const result = new TestCaseRunner(new ConsoleReader(), new ConsoleWriter(), new TestCaseValidator()).run();
    if (!result.isSuccess)
        console.log(result.errorMessage);
}
catch (error) {
    console.log(error);
}
