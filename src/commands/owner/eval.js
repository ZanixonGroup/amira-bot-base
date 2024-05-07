import { format } from "util";

export default [{
    name: "eval",
    command: [">>", ">","eval"],
    options: {
      nonPrefix: true
    },
    code: async({
      // client
      Commands,
      Plugins,
      client,
      rawMessage,
      m,
      quoted,
      
      // message property 
      args,
      text,
      body,
      mentions,
      mimetype,
      isQuoted,
      isMedia,
      isBaileys,
      
      // user property
      from,
      sender,
      remote,
      pushName,
      
      // group property
      isGroup,
      groups,
      metadata,
      participants,
      participantIds,
      groupAdmins,
      groupSuperAdmin,
      isAdmin,
      isSuperAdmin,
      isBotAdmin,
      
      // command property
      prefix,
      commandName,
      command,
      commandOptions,
      isCommand,
      plugins,
      alertMessage,
      
      // additional properties
      Func,
      dirname,
      filename,
      
      // additional modules
      MessageCollector,
      MessageBuilder,
      path,
      fs
    }) => {
      let __filename = filename(import.meta.url)
      let __dirname = dirname(import.meta.url)
      
      let evalCmd
      if(!text) return m.reply("Mana kode yang mau di eval?");
      try {
          evalCmd = /await/i.test(text) ? eval("(async() => { " + text + " })()") : eval(m.text)
      } catch (e) {
          m.reply(format(e))
      }
      new Promise(async (resolve, reject) => {
          try {
              resolve(evalCmd);
          } catch (err) {
              reject(err)
          }   
      })
      ?.then((res) => m.reply(format(res)))
      ?.catch((err) => m.reply(format(err)))
    }
}]