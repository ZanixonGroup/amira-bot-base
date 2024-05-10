import loadCommands from "./../handler/Commands.js";
import loadPlugins from "./../handler/Plugins.js";
import { Serialize } from "./../libs/serialize.js"
import Func from "./../libs/function.js";
import { dirname, filename } from "desm";
import fs from "fs";
import util from "util";
import path from "path";
import lodash from "lodash";

// import additional modules
import Cooldown from "./../libs/CooldownManager.js"
import MessageCollector from "./../handler/MessageCollector.js";
import { MessageBuilder } from "./../utils/Builders.js";

export default {
  name: "messages.upsert",
  code: async({ messages }) => {
    try {
      const client = global.client;
      const rawMessage = messages;
      const m = await Serialize(global.client, messages[0], global.store)
      const Commands = await loadCommands("./../commands");
      const Plugins = await loadPlugins("./../plugins", true);
      const sortedPlugins = [...Plugins.values()].sort((a, b) => a.name.localeCompare(b.name));
      
      // message checking
      if(!m) return
      if(m?.fromMe) return;
      
      // define message property
      const { 
        from,
        isBaileys,
        device,
        isGroup,
        isMedia,
        isOwner
      } = m;
      const quoted = m?.isQuoted ? m?.quoted : m;
      
      // @message property
      const args = m?.args;
      const text = m?.text;
      const body = m?.body;
      const mentions = quoted?.mentions || m?.mentions;
      const mimetype = quoted?.msg?.mimetype || m?.msg?.mimetype;
      
      const isQuoted = m?.isQuoted;
      // @ isOwner defined on line 30
      // @ isGroup defined on line 30
      // @ isMedia defined on line 30
      
      // @user property
      // @ from defined on line 30
      const sender = m?.key?.participant || m?.key?.remoteJid;
      const remote = m?.key?.remoteJid;
      const pushName = m?.pushName;
      
      // @group property 
      const groups = isGroup ? await client.groups() : {};
      const metadata = groups[m.from] || {};
      const participants = metadata?.participants || [{ id: sender, admin: null }];
      const participantIds = participants.map(d => d.id);
      const groupAdmins = isGroup ? participants.filter(d => d.admin == "admin" || d.admin == "superadmim").map(d => d.id) : [];
      const groupSuperAdmin = isGroup ? participants.filter(d => d.admin == "superadmin").map(d => d.id) : [];
      const isAdmin = isGroup ? groupAdmins.includes(sender) : false;
      const isSuperAdmin = isGroup ? groupSuperAdmin.includes(sender) : false;
      const isBotAdmin = isGroup ? groupAdmins.includes(client.user.id.split(":")[0]) : false;
      
      // @command property 
      const prefix = (m?.prefix.length > 0) ? m?.prefix : ".";
      const commandName = m?.command;
      const command = Array.from(Commands.values()).find((d) => d?.command?.find((x) => x.toLowerCase() == commandName)) || null;
      const commandOptions = command?.options;
      const isCommand = commandOptions?.nonPrefix ? (body.startsWith(`${prefix}${commandName}`) || commandOptions?.nonPrefix) : body.startsWith(`${prefix}${commandName}`);
      const plugins = { ...sortedPlugins.reduce((acc, v) => ({ ...acc, [v.name]: v.code }), {}) };
      
      // executor
      try {
        if(!command) return; // check command has null value
        if(!isCommand) return; // check message is a valid command
        
        // message permission checking
        const alertMessage = global.alertMessage;
        if(commandOptions?.isOwner && !m?.isOwner) {
          return m.reply(`${alertMessage["owner"]}`);
        }
        
        if(commandOptions?.isBot && !m?.fromMe) {
          return m.reply(`${alertMessage["bot"]}`);
        }
        
        if(commandOptions?.isPrivate && m?.isGroup) {
          return m.reply(`${alertMessage["private"]}`);
        }
        
        if(commandOptions?.isGroup && !m?.isGroup) {
          return m.reply(`${alertMessage["group"]}`);
        }
        
        if(commandOptions?.isBotAdmin && !isBotAdmin) {
          if(!m?.isGroup) return m.reply(`${alertMessage["group"]}`);
          return m.reply(`${alertMessage["botAdmin"]}`);
        }
        
        if(commandOptions?.isAdmin && !isAdmin) {
          if(!m?.isGroup) return m.reply(`${alertMessage["group"]}`);
          return m.reply(`${alertMessage["admin"]}`);
        }
        
        if(commandOptions?.isPremium && false) {
          return m.reply(`${alertMessage["premium"]}`);
        }
        
        // cooldown manager 
        if(command?.cooldown?.status) {
          const cooldown = new Cooldown(m, command?.cooldown?.duration);
          // on cooldown
          if(cooldown.onCooldown) return m.reply(`${command?.cooldown?.message.replace("{time}", cooldown.timeFormatted)}`);
        }
        
        const options = {
          // client properties
          Commands,
          Plugins,
          client,
          rawMessage,
          m,
          quoted,
          
          // message properties
          args,
          text,
          body,
          mentions,
          mimetype,
          isQuoted,
          isMedia,
          isBaileys,
          
          // user properties
          from,
          sender,
          remote,
          pushName,
          
          // group properties
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
          
          // command properties
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
          upperFirst: (q) => lodash.upperFirst(q),
          
          // additional modules
          MessageCollector,
          MessageBuilder,
          path,
          fs
        }
        
        /* still testing!
        if(command.command.includes("always_execute")) {
          let alwaysExecuteCommand = Array.from(Commands.values()).filter(data => data.name.includes("always_execute"));
          for(let cmd of alwaysExecuteCommand) {
            await cmd.code(options);
          }
          return;
        } else {
          await m.reply(`${alertMessage["wait"]}`);
          await command.code(options);
        }
        */
        
        await m.reply(`${alertMessage["wait"]}`);
        await command.code(options);
      } catch (e) {
        await m.reply(`${global.alertMessage["error"]}`);
        return console.log(`Error on command "${command.name}":`, util.format(e))
      }
    } catch (e) {
      return console.log("Error on command executor:", util.format(e))
    }
  }
}