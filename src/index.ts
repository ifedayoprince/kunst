import { parseProjectFile } from "./utils/findMetadata";
import { etchError, etchInfo, etchOk } from "./utils/logger";
import { generateFilesAndFill } from "./writer";
import figlet from 'figlet'

export interface ProgramArgs {
  htmlProjectFile: string;
  currentDir: string;
}

export const programStats = {
  testFiles: 0,
  pythonFiles: 0,
  failed: 0
}

export async function beginEtch (args: ProgramArgs) {
  figlet("ETCH", (err, data)=>{
    if (err) {
      etchError("there was an issue while booting.")
      return;
    }
    console.log(data);
  })

  let data = await parseProjectFile(args);

  await generateFilesAndFill(data);

  console.log("\n\n")
  figlet("ETCHed", (err, data)=>{
    if (err) {
      etchError("there was an issue while wrapping up.")
      return;
    }
    console.log(data);
  })
  etchOk(
`successfully created:
    - ${programStats.pythonFiles} python files.
    - ${programStats.testFiles} python test files.
    and one README file.
We had ${programStats.failed} unsuccessful attempt(s).`
)
}
