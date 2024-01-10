#!/usr/bin/env node

import program from 'commander'

import { beginKunst } from './index'
import { cwd } from 'process'
// import * as os from 'os'


program
  .version('0.1.0')
  .name("kunst")
  .description("A CLI tool that bootstraps an ALX project.")
  .action((file) => {
    if (typeof file !== "string")
      program.help()

    beginKunst({
      htmlProjectFile: file,
      currentDir: cwd()
    });
  })

program.parse(process.argv)
