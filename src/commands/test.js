export default {
  name: "test",
  command: ["test","tes"],
  code: async({ client }) => {
    try {
      console.log("Command test triggered!")
    } catch (e) {
      console.log(e)
    }
  }
}