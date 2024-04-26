import loadCommands from "./../handler/Commands.js";

export default {
  name: "messages.upsert",
  code: async({ messages }) => {
    const Commands = await loadCommands("./../commands");
    console.log("cmd:", Commands)
  }
}