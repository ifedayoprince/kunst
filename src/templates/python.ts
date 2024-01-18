import chalk from "chalk";
import { FunctionInfo, extractFunctionInfo } from "../utils/extractor";
import { Task } from "../utils/findMetadata";
import { kunstError } from "../utils/logger";

export function generatePythonScript(task: Task, fileName: string): string {
    let functionInfo: FunctionInfo;
    let optional = "";
    let optionalModule = ""

    if (task.prototype) {
        functionInfo = extractFunctionInfo(task.prototype);

        if (!functionInfo) {
            kunstError(`error while generating test file '${chalk.yellow(fileName)}'.`)
            process.exit()
        }

        optionalModule = `The module containing code for:
    ${functionInfo.name}`

        optional = (
            `${functionInfo.prototype}
    """
    __summary__

    Args:
${functionInfo.params.map((param) => (`        ${param} (_type_): __param_doc__`)).join("\n")}
    """

    pass
`)
    }

    return (
`#!/usr/bin/python3
"""
${optionalModule == "" ? "__summary__" : optionalModule}
"""

${optional}

"""
${task.description}

CLI TEST:
${task.cliTest}
"""
`)
}