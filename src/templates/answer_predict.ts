import { Task } from "../utils/findMetadata";

export function generateAnswerPredict(task: Task, _fileName: string): string {
    return (
`${task.cliTest}
__answer__`)
}