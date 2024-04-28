import "./../config.js";
import * as glob from "glob";
import path from "path";
import util from "util";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const Commands = new Map();
async function loadCommands(commandsDirectory, logs) {
  try {
    const directory = path.join(__dirname, "..", commandsDirectory);
    const files = glob.sync(`${directory}/**/*.js`);
    files.forEach(async (file) => {
      const baseCommand = await import(file);
      const commands = baseCommand.default;
      for(let command of commands) {
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
          	status: command?.disable?.status ? command?.disable?.status : false,
            message: command?.disable?.message ? command?.disable?.message : "This command is currently disabled!",
          },
          cooldown: {
            status: command?.cooldown?.status ? command?.cooldown?.status : false,
            duration: command?.cooldown?.duration ? command?.cooldown?.duration : 0,
            message: command?.cooldown?.message ? command?.cooldown?.message : "Please wait *_{time}_* to run this command again!"
          },
          code: command?.code ? command?.code : () => {}
        };
       Commands.set(command?.name, options);
      }
    })
    return Commands;
  } catch (e) {
    console.log(global.clock.info, "[Error]".danger, "Something error on commands handler:".warn,
      "\n", util.format(e).danger);
  }
}

export default loadCommands;