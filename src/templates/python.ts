import chalk from "chalk";
import { FunctionInfo, extractFunctionInfo } from "../utils/extractor";
import { Task } from "../utils/findMetadata";
import { kunstError } from "../utils/logger";

export function generatePythonScript(task: Task, fileName: string): string {
    let functionInfo: FunctionInfo;
    let optional = "";

    if (task.prototype) {
        functionInfo = extractFunctionInfo(task.prototype);

        if (!functionInfo) {
            kunstError(`error while generating test file '${chalk.yellow(fileName)}'.`)
            process.exit()
        }

        optional = (
            `${functionInfo.prototype}
    """
    __summary__

    Params:
${functionInfo.params.map((param) => (`        - ${param}: __param_doc__`)).join("\n")}
    """

    pass
`)
    }

    return (
`#!/usr/bin/python3
"""
__summary__
"""

${optional}

"""
${task.description}

CLI TEST:
${task.cliTest}
"""
`)
}