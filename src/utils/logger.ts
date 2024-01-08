import chalk from "chalk"

export function etchError(msg: string) {
    console.error(chalk.red(`[etch](error): `) + msg)
}

export function etchOk(msg: string) {
    console.error(chalk.green(`[etch](success): `) + msg)
}

export function etchInfo(msg: string) {
    console.error(chalk.blue(`[etch](info): `) + msg)
}