import loadCommands from "./../handler/Commands.js";
import { Serialize } from "./../libs/serialize.js"

export default {
  name: "messages.upsert",
  code: async({ messages }) => {
    const client = global.client;
    const m = await Serialize(global.client, messages[0])
    const Commands = await loadCommands("./../commands");
    if(m.fromMe) return;
  }
}