export default [{
  name: "sticker",
  command: ["sticker","stiker","s","wm","stickerwm","stikerwm","swm"],
  code: async({ client, m, quoted, mimetype, text }) => {
    try {
      if(!/image|video|webp/i.test(mimetype)) return m.reply("Balas gambar atau video yang ingin dijadikan sticker");
      m.reply("Tunggu sebentar...")
      const buffer = await quoted.download();
      let exif;
      if(text) {
        const [name, author] = text.split("|");
        exif = { packName: name ? name : "", packPublish: author ? author : "" };
      } else {
        exif = { packName: "Created by", packPublish: "@ Amira-MD" };
      }
      m.reply(buffer, { asSticker: true, ...exif });
    } catch (e) {
      m.reply("Terjadi kesalahan pada command!");
      console.log(e)
    }
  }
}]