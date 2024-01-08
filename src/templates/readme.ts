import { extractFunctionInfo } from "../utils/extractor";
import { ProjectData, Task } from "../utils/findMetadata";

export function generateReadme(project: ProjectData): string {
    return (
`# ${project.projectName}
==============================
I learnt:
- Something
- Something


## Tasks: 
${project.tasks.map((task)=>(`- **${task.name}**: \n${task.description}\n`)).join("\n")}
`)
}