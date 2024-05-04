# Introduction
Hello there, Welcome to the **Amira-MD** bot base documentation. Amira is a simple whatsapp bot with various supporting features that can make it easier for developers to develop better and structured bots.

Creating a whatsapp bot becomes easier with the **Amira-MD** base with its supporting features such as structured commands, plugins support, local database support and various other features.


## Commands
Make your whatsapp bot command more structured with a good command handler, the command handler feature in this base can recursively read command files in nested folders. Not only how to read recursive command files, but you can also create many commands with just 1 file because we have personalized it so that the handler can read many commands in 1 file with its array system.

#### Example
```js
export default [{
  name: "your command name",
  command: ["command trigger"],
  code: async({}) => {}
},{
  name: "your command name",
  command: ["command trigger"],
  code: async({}) => {}
}]
```

**Note:**
> Read more command documentation on Commands.md file!