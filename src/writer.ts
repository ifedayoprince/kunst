import path, { ParsedPath, join, parse } from "path";
import { generateTest } from "./templates/tests";
import { ProjectData } from "./utils/findMetadata";
import { mkdir, writeFile } from "fs/promises";
import { generatePythonScript } from "./templates/python";
import { generateReadme } from "./templates/readme";
import { kunstError, kunstOk } from "./utils/logger";
import chalk from "chalk";
import { programStats } from ".";
import { cwd } from "process";

export enum FileType {
    PYTHON_SCRIPT = "python_script",
    PYTHON_TEST = "python_test",
    README = "readme",
    NONE = "none"
}
export async function generateFilesAndFill(projectData: ProjectData) {
    await safeWrite(projectData, parse("README.md"), generateReadme(projectData), FileType.README)

    for (let task of projectData.tasks) {
        for (let file of task.files) {
            let filePath = path.parse(file);
            if (filePath.ext == ".txt" && file.includes("tests")) {
                programStats.testFiles++;

                await safeWrite(projectData, filePath, generateTest(task, filePath.name), FileType.PYTHON_TEST)
            } else if (filePath.ext == ".py" && !file.includes("tests")) {
                programStats.pythonFiles++;

                let out = generatePythonScript(task, filePath.name)
                await safeWrite(projectData, filePath, out, FileType.PYTHON_SCRIPT)
            } else {
                programStats.failed++;
                kunstError(`could not generate file '${chalk.yellow(file)}', please set it up yourself.`)
            }
        }
    }
}

async function safeWrite(projectData: ProjectData, filePath: ParsedPath, content: string, fileType: FileType) {
    let writePath = join(cwd(), projectData.projectDirectory, filePath.dir, filePath.base)
    try {
        await writeFile(writePath, content)
        fileCreated(fileType, filePath);
    } catch (e) {
        await mkdir(parse(writePath).dir, { recursive: true })
        await writeFile(writePath, content)

        fileCreated(fileType, filePath)
    }
}

function fileCreated(fileType: FileType, filePath: ParsedPath) {
    kunstOk(`generated${(fileType == FileType.PYTHON_SCRIPT)
        ? " python script"
        : (fileType == FileType.PYTHON_TEST)
            ? " python test"
            : fileType == FileType.README
                ? " readme"
                : ""} file '${chalk.yellow(filePath.base)}' successfully.`)
}