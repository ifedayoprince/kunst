export interface FunctionInfo {
    name: string;
    prototype: string;
    params: string[]
}
export function extractFunctionInfo(string): FunctionInfo {
    const regex = /(def (\w+)\((.*?)\):)/;
    const match = string.match(regex);

    if (match && match[1] && match[2] && match[3]) {
        const functionPrototype = match[1];
        const functionName = match[2];
        const parameterNames = match[3].split(',').map(param => param.split("=")[0].trim());

        return {
            prototype: functionPrototype,
            name: functionName,
            params: parameterNames,
        };
    } else {
        return null; // Return null if no match is found
    }
}

export function extractFileNames(inputString) {
    const regex = /File: ([\w\/.-]+(?:, [\w\/.-]+)*)/;
    const match = inputString.match(regex);

    if (match && match[1]) {
        const filesString = match[1];
        const filesArray = filesString.split(', ').map(file => file.trim());
        return filesArray;
    } else {
        return [];
    }
}
