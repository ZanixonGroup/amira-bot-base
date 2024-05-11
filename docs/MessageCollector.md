![Amira Bot Base](https://telegra.ph/file/54cbfb6c7f6b2d69f85cd.jpg)

# Message Collector
This function is used to retrieve messages from the `messages.upsert` event and then send it to the command you created, with this function you no longer need to use a database to store a session or message to replied, so this function makes it very easy for you to create an await message system.

## Table of contents
1. [Setup collector](#setup-collector)
2. [Create message listener](#create-message-listener)
3. [Create message exit](#create-message-exit)


## Setup collector
First import MessageCollector from the command option before setup.
```js
export default [{
  tag: "example",
  name: "listen",
  command: ["listen"],
  code: async({ client, m, MessageCollector }) => {
    // your code here
  }
}]
```

After you have imported the MessageCollector, you can now do the setup as below.
```js
export default [{
  tag: "example",
  name: "listen",
  command: ["listen"],
  code: async({ client, m, MessageCollector }) => {
    const col = new MessageCollector({
      timeout: 60000 // format in milliseconds
    });
  }
}]
```

## Create message listener
This event serves to get incoming messages through the baileys `messages.upsert` event and then sent in json format to the event collector.
```js
export default [{
  tag: "example",
  name: "listen",
  command: ["listen"],
  code: async({ client, m, MessageCollector }) => {
    const col = new MessageCollector({
      timeout: 60000 // format in milliseconds
    });
    
    col.on("collect", async(msg) => {
      m.reply(`Message collected: ${msg.message}`);
      col.collected()
    }
  }
}]
```

```js
col.collected() // exit collector with status collected
col.exit() // exit collector with status exit
```

#### Output example:
```js
{
  author: String
  sender: String
  message: String
}
```

## Create message exit
The end event handles timeouts and collected events.

```js
export default [{
  tag: "example",
  name: "listen",
  command: ["listen"],
  code: async({ client, m, MessageCollector }) => {
    const col = new MessageCollector({
      timeout: 60000 // format in milliseconds
    });
    
    col.on("collect", async(msg) => {
      m.reply(`Pesan di dapat: ${msg.message}`);
      col.collected()
    }
    
    col.on("end", async(res) => {
      if(res.status === "collected") return; // exit without trigger code in below
      m.reply("No one message collected, event exited");
    }
  }
}]
```

#### Output example:
```js
{
  status: String // "exit" or "collected" status
}
```