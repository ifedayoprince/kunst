import chalk from "chalk"

export function kunstError(msg: string) {
    console.error(chalk.red(`[kunst](error): `) + msg)
}

export function kunstOk(msg: string) {
    console.error(chalk.green(`[kunst](success): `) + msg)
}

export function kunstInfo(msg: string) {
    console.error(chalk.blue(`[kunst](info): `) + msg)
}