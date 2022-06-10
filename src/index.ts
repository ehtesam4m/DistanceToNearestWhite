import { ConsoleReader } from "./consoleReader";
import { ConsoleWriter } from "./consoleWriter";
import { TestCaseRunner } from "./testCaseRunner";

console.log('Started');
try {
    new TestCaseRunner(new ConsoleReader(), new ConsoleWriter()).run();
}
catch (e) {
    console.log(e);
}