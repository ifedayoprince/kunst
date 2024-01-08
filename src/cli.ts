#!/usr/bin/env node

import program from 'commander'

import { beginKunst } from './index'
 
program
  .version('0.1.0')
  .option('-p, --project [project_file]', 'The single HTML of the project page as downloaded from the intranet.')
  .parse(process.argv)

beginKunst({
  htmlProjectFile: program.project,
  currentDir: __dirname
})
