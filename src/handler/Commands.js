import "./../config.js";
import * as glob from "glob";
import path from "path";
import util from "util";

const Commands = new Map();
async function loadCommands(commandsDirectory, logs) {
  try {
    const directory = path.join(global.dirname, commandsDirectory);
    const files = glob.sync(`${directory}/**/*.js`);
    files.forEach(async (file) => {
      const baseCommand = await import(file);
      const command = baseCommand.default;
      const options = {
        name: command?.name,
        command: command?.command,
        code: command?.code ? command?.code : () => {}
      };
      Commands.set(command?.name, options);
    })
    return Commands;
  } catch (e) {
    console.log(global.clock.info, "[Error]".danger, "Something error on commands handler:".warn,
    "\n", util.format(e).danger);
  }
}

export default loadCommands;