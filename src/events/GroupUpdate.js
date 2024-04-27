export default {
    name: "group-participants.update",
    code: async ({
        id,
        participants,
        action
    }) => {
        switch (action) {
            case "add":
            case "remove":
                let groupMetadata = await global.client.groupMetadata(id);
                let isAddAction = action === "add";
                let sendedMessage = isAddAction ? "Halo @tag, Selamat Datang digroup @name" : "Sampai jumpa @tag";
                let replacedMessage = sendedMessage.replace("@tag", participants[0].split("@")[0]).replace("@name", groupMetadata.subject)
                await global.client.sendMessage(id, {
                    caption: replacedMessage,
                    mentions: [participants[0]]
                })
                break;
            case "promote":
            case "demote":
                let isAction = action === "promote";
                let sendedMessage = isAction ? "Selamat @tag, kamu telah menjadi Admin" : "@tag Maaf kamu didemote";
                let replacedMessage = sendedMessage.replace("@tag", participants[0].split("@")[0])
                await global.client.sendMessage(id, {
                    caption: replacedMessage,
                    mentions: [participants[0]]
                })
                break;
        }
    }