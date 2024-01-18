import { parseProjectFile } from "./utils/findMetadata";
import { kunstError, kunstOk } from "./utils/logger";
import { generateFilesAndFill } from "./writer";
import figlet from 'figlet'

export interface ProgramArgs {
  htmlProjectFile: string;
  currentDir: string;
}

export const programStats = {
  testFiles: 0,
  pythonFiles: 0,
  answerFiles: 0,
  failed: 0
}

export async function beginKunst (args: ProgramArgs) {
  figlet("KUNST", (err, data)=>{
    if (err) {
      kunstError("there was an issue while booting.")
      return;
    }
    console.log(data);
  })

  let data = await parseProjectFile(args);

  await generateFilesAndFill(data);

  console.log("\n\n")
  figlet("KUNSTed", (err, data)=>{
    if (err) {
      kunstError("there was an issue while wrapping up.")
      return;
    }
    console.log(data);
  })
  kunstOk(
`successfully created:
    - ${programStats.pythonFiles} python files.
    - ${programStats.testFiles} python test files.
    and one README file.
We had ${programStats.failed} unsuccessful attempt(s).`
)
}
