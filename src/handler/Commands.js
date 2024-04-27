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
        options: {
        	isAdmin: command?.isAdmin ? command?.isAdmin : false,
            isBotAdmin: command?.isBotAdmin ? command?.isBotAdmin : false,
            isPremium: command?.isPremium ? command?.isPremium : false,
            isOwner: command?.isOwner ? command?.isOwner : false,
            isGroup: command?.isGroup ? command?.isGroup : false,
            isPrivate: command?.isPrivate ? command?.isPrivate : false,
            nonPrefix: command?.nonPrefix ? command?.nonPrefix : false,
        },
        disable: {
        	status: ? command?.disable?.status ? command?.disable?.status : false,
            message: command?.disable?.message ? command?.disable?.message : false,
        },
        code: command?.code ? command?.code : () => {}
      };
      console.log(command)
      Commands.set(command?.name, options);
    })
    return Commands;
  } catch (e) {
    console.log(global.clock.info, "[Error]".danger, "Something error on commands handler:".warn,
    "\n", util.format(e).danger);
  }
}

export default loadCommands;