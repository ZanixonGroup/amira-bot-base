import MessageCollector from "./../handler/MessageCollector.js";

export default [{
  name: "listen",
  command: ["listen"],
  code: async({ client, m }) => {
    m.reply("Balas dengan pesan apapun!");
    
    // init MessageCollector
    const col = new MessageCollector(client, m, {
      timeout: 60000
    });
    
    // call MessageCollector
    col.on("collect", async(data) => {
      m.reply(`${JSON.stringify(data, null, 2)}`);
      col.exit();
    })
    
    col.on("end", () => {
      m.reply("Message collector diakhiri!")
    })
  }
}]