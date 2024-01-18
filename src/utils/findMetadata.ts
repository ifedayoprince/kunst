import { join } from "path";
import { ProgramArgs } from "..";
import { readFile } from "fs/promises";
import * as cheerio from "cheerio";
import { extractFileNames } from "./extractor";
import { kunstError } from "./logger";
import chalk from "chalk";

export interface Task {
    name: string;
    id: number;
    description: string;
    prototype: {
        name: string;
        code: string;
    } | null;
    files: string[];
    cliTest: string;
}

export interface ProjectData {
    projectName: string;
    projectDirectory: string;
    projectParent: string;
    tasks: Task[];
}

export async function parseProjectFile(args: ProgramArgs): Promise<ProjectData> {
    let finalPath = join(args.currentDir, args.htmlProjectFile);
    let file: string;
    try {
        file = (await readFile(finalPath)).toString();
    } catch (e) {
        kunstError(`file '${chalk.yellow(args.htmlProjectFile)}' does not exist.`)
        process.exit(1);
    }
    let $ = cheerio.load(file)
    let projectExport: ProjectData = {
        projectName: "",
        projectDirectory: "",
        projectParent: "",
        tasks: []
    };

    let tasks = $('body > main > article > div.project > div > div[id^="task-num"]');

    projectExport.projectName = $('body > main > article > div.project > div > h1.gap').text()
    projectExport.projectDirectory = $('body > main > article > div.project > div > div[id^="task-num"] > div[id^="task-"] > div > div > ul > li > code').eq(1).text()
    projectExport.projectParent = $('body > main > article > div.project > div > div[id^="task-num"] > div[id^="task-"] > div > div > ul > li > code').eq(0).text()

    projectExport.tasks = []
    for (let task of tasks) {
        projectExport.tasks.push(await parseTask(task))
    }

    return projectExport;
}

async function parseTask(task: cheerio.Element): Promise<Task> {
    let taskData: Task = {
        name: "",
        id: 0,
        description: "",
        prototype: null,
        files: [],
        cliTest: ""
    };
    let taskCheerio = cheerio.load(task);

    let description, title, match, files;


    files = taskCheerio('div.panel.task-card > div.list-group > div > ul > li').eq(2).text().trim()
    title = taskCheerio('div.panel.task-card > div.panel-body > p').first().text().trim()
    description = taskCheerio('div.panel.task-card > div.panel-body > ul').text().trim()

    taskData.id = parseInt(task.attribs["data-role"].replace("task", ""));
    taskData.name = taskCheerio('div.panel.task-card > div.panel-heading > h3').text().trim()
    taskData.description = `${title}\n\n${description}`
    taskData.cliTest = taskCheerio('div.panel.task-card > div.panel-body > pre > code').first().text().trim()

    taskData.prototype = null;
    if ((match = taskData.description.match("(def .+?\(.*?\):)")))
        taskData.prototype = match[0]

    taskData.files = extractFileNames(files);

    return taskData;
}
