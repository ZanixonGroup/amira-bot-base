export default {
    name: "group-participants.update",
    code: async ({
        id,
        participants,
        action
    }) => {
      try {
        if(!id) return 
        const client = global.client;
        const groups = await client.db.get("metadata", "groups");
        const groupMetadata = groups[id];
        const tag = participants[0].split("@")[0];
        if (/^(add|remove)$/.test(action)) {
          const message = action === "add" ? `Halo @${tag}, Selamat Datang digroup ${groupMetadata.subject}` : `Sampai jumpa @${tag}`;
          await client.sendMessage(id, {
              text: message,
              mentions: [participants[0]]
          });
        } else if (/^(promote|demote)$/.test(action)) {
          const message = action === "promote" ? `Selamat @${tag}, kamu telah menjadi Admin` : `@${tag} Maaf kamu didemote`;
          await client.sendMessage(id, {
              text: message,
              mentions: [participants[0]]
          });
        }
      } catch (e) {
        global.logs.error(import.meta.url, e);
      }
    }
}