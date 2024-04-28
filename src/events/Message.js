import loadCommands from "./../handler/Commands.js";
import { Serialize } from "./../libs/serialize.js"
import Cooldown from "./../libs/CooldownManager.js"
import Func from "./../libs/function.js";
import util from "util";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// import additional modules
import MessageCollector from "./../handler/MessageCollector.js";

export default {
  name: "messages.upsert",
  code: async({ messages }) => {
    try {
      const client = global.client;
      const rawMessage = messages;
      const m = await Serialize(global.client, messages[0])
      const Commands = await loadCommands("./../commands");
      
      // message checking
      if(!m) return
      if(m?.fromMe) return;
      
      // define message property
      const { 
        from,
        isBaileys,
        device,
        isGroup,
        isMedia
      } = m;
      const quoted = m?.isQuoted ? m?.quoted : m;
      
      // @message property
      const args = m?.args;
      const text = m?.text;
      const body = m?.body;
      const mentions = quoted?.mentions || m?.mentions;
      const mimetype = quoted?.msg?.mimetype || m?.msg?.mimetype;
      
      const isQuoted = m?.isQuoted;
      // @ isGroup defined on line 16
      // @ isMedia defined on line 16 
      
      // @user property
      // @ from defined on line 16 
      const sender = m?.key?.participant || m?.key?.remoteJid;
      const remote = m?.key?.remoteJid;
      const pushName = m?.pushName;
      
      // @group property 
      const groups = global.store.groupMetadata;
      const metadata = m?.metadata || {};
      const participants = metadata?.participants || [{ id: sender, admin: null }];
      const participantIds = participants.map(d => d.id);
      const groupAdmins = isGroup ? participants.filter(d => d.admin == "admin" || d.admin == "superadmim").map(d => d.id) : [];
      const groupSuperAdmin = isGroup ? participants.filter(d => d.admin == "superadmin").map(d => d.id) : [];
      const isAdmin = isGroup ? groupAdmins.includes(sender) : false;
      const isSuperAdmin = isGroup ? groupSuperAdmin.includes(sender) : false;
      const isBotAdmin = isGroup ? groupAdmins.includes(client.user.id.split(":")[0]) : false;
      
      // @command property 
      const prefix = m?.prefix;
      const commandName = m?.command;
      const command = Array.from(Commands.values()).find((d) => d?.command?.find((x) => x.toLowerCase() == commandName)) || null;
      const commandOptions = command?.options;
      const isCommand = commandOptions?.nonPrefix ? commandOptions?.nonPrefix : body.startsWith(`${prefix}${commandName}`);
      //console.log(m, command)
      
      // executor
      try {
        if(!command) return; // check command has null value
        if(!isCommand) return; // check message is a valid command
        
        // cooldown manager 
        if(command?.cooldown?.status) {
          const cooldown = new Cooldown(m, command?.cooldown?.duration);
          // on cooldown
          if(cooldown.onCooldown) return m.reply(`${command?.cooldown?.message.replace("{time}", cooldown.timeFormatted)}`);
        }
        
        const options = {
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
        }
        command.code(options);
      } catch (e) {
        console.log(util.format(e))
      }
    } catch (e) {
      console.log(util.format(e))
    }
  }
}