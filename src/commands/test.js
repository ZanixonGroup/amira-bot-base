export default [{
  name: "test",
  command: ["test","tes"],
  code: async({ client, m }) => {
    try {
      m.reply("work coy!")
    } catch (e) {
      console.log(e)
    }
  }
}]