import fs from "fs";

export default [{
  name: "menu",
  command: ["menu"],
  code: async({ client, m, remote, dirname, path, MessageBuilder }) => {
    try {
      const __dirname = dirname(import.meta.url);
      const media = fs.readFileSync(path.join(__dirname, "ztrdiamond-icon-low.png"));
      const mentions = ["6285697103902@s.whatsapp.net"];
      
      const message = new MessageBuilder()
        .setCaption("Testing thumbnail")
        .setMentions(mentions)
        .setImage(media)
        .setMimetype("image/png")
        .setThumbnailTitle("Title nya")
        .setThumbnailBody("Body nya")
        .setThumbnailLarge()
        .setThumbnailImage("https://telegra.ph/file/d7109be0db36e7cbd56a8.jpg")
        .setThumbnailUrl("https://contoh.com")
        .build()
        
      console.log(message)
      client.sendMessage(remote, message);
    } catch (e) {
      console.log(e)
    }
  }
}]