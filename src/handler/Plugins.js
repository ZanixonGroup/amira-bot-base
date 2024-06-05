/*
    Baileys loadPlugins by github.com/ZTRdiamond
    ------------------------------------------------------
    Source: https://github.com/ZanixonGroup/amira-bot-base
    | Don't delete this credit!
*/

import "./../config.js";
import * as glob from "glob";
import path from "path";
import util from "util";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const Plugins = new Map();
async function loadPlugins(pluginsDirectory, logs) {
  try {
    const directory = path.join(__dirname, "..", pluginsDirectory);
    const files = glob.sync(`${directory}/**/*.js`);
    files.forEach(async (file) => {
      const basePlugin = await import(file);
      const plugins = basePlugin.default;
      if(!plugins) return logs ? console.log(global.clock.info, "[ERROR]".danger, "Plugin error:".warn,"\n", `Undefined reading plugins on path "${file}", there's no code in the plugin file!`.danger) : null;
      for(let plugin of plugins) {
        if(!plugin?.name) return logs ? console.log(global.clock.info, "[ERROR]".danger, "Plugin error:".warn,"\n", `Undefined plugin name at path "${file}" location, please fix it to load the plugin!`.danger) : null;
        const options = {
          name: plugin?.name ? plugin?.name : "",
          code: plugin?.code ? plugin?.code : () => {}
        };
        Plugins.set(plugin?.name, options);
      }
    })
    return Plugins;
  } catch (e) {
    console.log(global.clock.info, "[ERROR]".danger, "Something error on commands handler:".warn,
      "\n", util.format(e).danger);
  }
}

export default loadPlugins;