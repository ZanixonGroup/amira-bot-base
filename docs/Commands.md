![Amira Bot Base](https://telegra.ph/file/54cbfb6c7f6b2d69f85cd.jpg)

# Command Documentation

The command structure is a good option for creating or developing a whatsapp bot to prioritize code neatness, the advantage is that it makes maintenance easier when one of the commands is broken, it will be easier to fix because each command will have its own space scope.

## Table of contents

1. [Create a command](#create-a-command)
   1. [Command properties](#command-properties)
   2. [Command options properties](#command-options-properties)
   3. [Command code options properties](#command-code-options-properties)


<br>

## Create a command

Create your command easily with simple documentation and simple command syntax.


### Command properties
| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `tag` | `String` | `true` | Tag option is used for sorting command data for help or menu command. |
| `name` | `String` | `true` | The name option is used to identify commands about what tasks it can perform. |
| `command` | `Array` | `true` | The command option is a trigger function to call the command |
| `options` | `Object` | `false` | Options is used to place some permission options for the command. |
| `disable` | `object` | `false` | The disable option is used to disable the command with two properties: `status: Boolean` and `message: String`. |
| `cooldown` | `Object` | `false` | Used for making cooldown for command with two properties inside: `status: Boolean`, `duration: Integer (ms)`, and `message: String` (with {time} property). |
| `code` | `[Async function]` | `true` | Used for place your code and executing your code. |


### Command options properties
| Name | Type | Description |
| --- | --- | --- |
| `isAdmin` | `Boolean` | Identify the command is for admin group only. |
| `isBotAdmin` | `Boolean` | Check the command if the bot is admin before executing the code. |
| `isPremium` | `Boolean` | Check the user is premium or not before executing the code. |
| `isOwner` | `Boolean` | Identify the command is for owner bot only. |
| `isGroup` | `Boolean` | Identify the command is for group only. |
| `isPrivate` | `Boolean` | Identify the command is for private chat only. |
| `nonPrefix` | `Boolean` | Make the command executed without prefix. |

### Command code options properties
I'll not make the code options properties documentation here, because code options is a changeable properties that will updated in the future, you can check all default code options properties [HERE](https://github.com/ZanixonGroup/amira-bot-base/blob/master/src%2Fevents%2FMessage.js) or you can check localy on `/src/events/Message.js`

### Example command setup
```js
export default [{
  tag: "main",
  name: "help",
  command: ["help"],
  limit: {
    status: Boolean,
    amount: Integer // limit usage do you want for command
  },
  options: {
    // your command options here!
  },
  code: async({ client, m }) => {
    // put your code here.
  }
}]
```