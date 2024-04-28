import { format } from "util";


export default [{
    name: "eval",
    command: [">>", ">"],
    options: {
      nonPrefix: true
    },
    code: async({
      // client
      Commands,
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
      
      // additional properties
      __dirname,
      
      // additional modules
      MessageCollector
    }) => {
        let evalCmd
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