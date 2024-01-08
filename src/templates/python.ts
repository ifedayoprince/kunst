import { FunctionInfo, extractFunctionInfo } from "../utils/extractor";
import { Task } from "../utils/findMetadata";

export function generatePythonScript(task: Task, fileName: string): string {
    let functionInfo: FunctionInfo;
    let optional = "";

    if (task.prototype) {
        functionInfo = extractFunctionInfo(task.prototype);

        if (!functionInfo) {
            console.error(`[etch]: error while generating test file '${fileName}'.`)
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