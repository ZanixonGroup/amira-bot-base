import "./../config.js";
import * as glob from "glob";
import path from "path";
import util from "util";

const Events = new Map();
async function loadEvents(client, eventsDirectory, logs) {
  try {
    const directory = path.join(global.dirname, eventsDirectory);
    const files = glob.sync(`${directory}/**/*.js`);
    files.forEach(async (file) => {
      const baseEvent = await import(file);
      const event = baseEvent.default;
      if(!event.name) return;
      
      const { name, code } = event;
      try {
        client.ev.on(name, code);
      } catch (e) {
        console.log(global.clock.info, "[Error]".danger, "Something error on event handler:".warn,
        "\n", util.format(e).danger);
      }
    })
  } catch (e) {
    console.log(global.clock.info, "[Error]".danger, "Something error on event handler:".warn,
    "\n", util.format(e).danger);
  }
}

export default loadEvents;