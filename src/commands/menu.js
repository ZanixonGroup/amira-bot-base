export default [{
  name: "menu",
  command: ["menu"],
  code: async({ client, m, remote, sender, Commands, MessageBuilder, prefix, upperFirst }) => {
    try {
      let listCommand = "";
      let commandCategory = {}
      Array.from(Commands.values()).map(d => {
        commandCategory[d.tag] = Array.from(Commands.values()).filter(cmd => cmd.tag === d.tag);
      });
      for(let tag in commandCategory) {
        if(tag === "hidden") return;
        let commands = commandCategory[tag];
        if(commands) {
          let filteredCommand = commands.filter(d => !d.disable.status).map(cmd => {
            let isPremium = cmd.options.isPremium ? "🄿" : "";
            return `│・${prefix + cmd.command[0]} ${isPremium}`;
          })
          let list = filteredCommand.sort();
          listCommand += `╭─❨ *${upperFirst(tag)}* ❩\n`;
          listCommand += list.join("\n") + "\n";
          listCommand += `╰──────────────────・\n\n`;
          console.log(listCommand)
        }
      }
      const message = new MessageBuilder()
        .setText(`Halo @${sender.split("@")[0]}, Amira disini!

${listCommand}`)
        .setMentions([sender])
        .setThumbnailMediaUrl("https://github.com/ZanixonGroup")
        .setThumbnailTitle("Amira Bot Base | WhatsApp Bot")
        .setThumbnailBody("Copyright © ZanixonGroup 2024 - All Right Reserved")
        .setThumbnailLarge()
        .setThumbnailImage("https://telegra.ph/file/54cbfb6c7f6b2d69f85cd.jpg")
        .setThumbnailUrl("https://github.com/ZanixonGroup")
        .setForwardingScore(9999)
        .setForwarded(true)
        .setNewsletterJid("120363183632297680@newsletter")
        .setNewsletterName("Developed by Zanixon Group™")
        .setNewsletterServerMessageId(125)
        .build()
      client.sendMessage(remote, message, { quoted: m });
    } catch (e) {
      console.log(e)
    }
  }
}]