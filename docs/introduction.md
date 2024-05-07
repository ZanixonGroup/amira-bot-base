![Amira Bot Base](https://telegra.ph/file/54cbfb6c7f6b2d69f85cd.jpg)

# Introduction
Hello there, Welcome to the **Amira-MD** bot base documentation. Amira is a simple whatsapp bot with various supporting features that can make it easier for developers to develop better and structured bots.

Creating a whatsapp bot becomes easier with the **Amira Bot** base with its supporting features such as structured commands, plugins support, local database support and various other features.


## Table of contents

1. [Commands](#commands)
2. [Events](#events)
3. [Plugins](#plugins)


## Commands
Make your whatsapp bot command more structured with a good command handler, the command handler feature in this base can recursively read command files in nested folders. Not only how to read recursive command files, but you can also create many commands with just 1 file because we have personalized it so that the handler can read many commands in 1 file with its array system.

#### Example: first_command.js
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

## Events
We have also created event handlers to make it easier to create events and also make events more structured and searchable.

Create your event system easily using the syntax below!
#### Example: RejectCall.js
```js
export default {
  name: "call", // baileys event name
  code: async(json) => {
    // your code here...
  }
}
```

## Plugins
Plugins is a function system but with automatic handling, with this system you do not need to export or import manually. you only need to call the `plugins.yourFunction()` option property to start using functions from plugins.

You can create your own plugin with the method and syntax as below.
#### Example: say_and_greet.js
```js
export default [{
  name: "say", // function name
  code: (
    query // function parameters
  ) => {
    return "You say: " + query;
  }
},{
  name: "greet",
  code: async(name) => {
    if(!name) return `There's no one for me to greet!`;
    return `Hello ${name}!`;
  }
}]
```
