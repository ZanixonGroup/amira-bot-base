export default [{
  name: "test",
  command: ["test","tes"],
  cooldown: {
    status: true,
    duration: 86400000
  },
  code: async({ client, m }) => {
    try {
      m.reply("work coy!")
    } catch (e) {
      console.log(e)
    }
  }
}]