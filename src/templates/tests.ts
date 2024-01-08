import { extractFunctionInfo } from "../utils/extractor";
import { Task } from "../utils/findMetadata";
import { etchError } from "../utils/logger";

export function generateTest(task: Task, fileName: string): string {
    let functionInfo = extractFunctionInfo(task.prototype);

    if (!functionInfo) {
        etchError(`error while generating test file '${fileName}'.`)
        process.exit()
    }
    return (
        `The '${fileName}' test module
==============================

Using ''${functionInfo.name}''
---------------------

This file is in restructured text format.
First import ''${functionInfo.name}'' from the ''${fileName}'' module:

    >>> ${functionInfo.name} = __import__('${fileName}').${functionInfo.name}

`)
}