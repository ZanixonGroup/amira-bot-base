import "./config.js";
import loadEvents from "./handler/Events.js";
import loadCommands from "./handler/Commands.js";
import loadPlugins from "./handler/Plugins.js";
import { BindClient } from "./libs/serialize.js"
import {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    makeInMemoryStore
} from "@whiskeysockets/baileys";
import Pino from "pino";
import { Boom } from "@hapi/boom";
import path from "path";

const store = makeInMemoryStore({ logger: Pino({ level: "fatal" }).child({ level: "fatal" }) })
const isPairing = process.argv.includes("--pairing");
let timeout = 0

async function start() {
  const auth = await useMultiFileAuthState("session");
  const client = makeWASocket({
    printQRInTerminal: !isPairing,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    auth: auth.state,
    logger: Pino({ level: "fatal" }).child({ level: "fatal" })
  });
  
  // bindings
  store.bind(client.ev);
  await BindClient({client, store});
  global.client = client;
  global.store = store;
  
  // pairing login
  if(isPairing && !client.authState.creds.registered) {
    const botNumber = global.botNumber;
    console.log(global.clock.info, "[Amira-Bot]".main, "Request new session:".info,
    "\n>", "Bot Number:".info, botNumber.warn);
    setTimeout(async function() {
      const pairingCode = await client.requestPairingCode(botNumber)
      console.log(">", "Pairing Code:".info, pairingCode.warn);
    }, 30000);
  }
  
  await loadEvents(client, "events");
  const Commands = await loadCommands("commands");
  const Plugins = await loadPlugins("plugins", true);
  
  // session manager
  client.ev.on("creds.update", auth.saveCreds);
  client.ev.on("connection.update", async(update) => {
    const {
      lastDisconnect,
      connection,
      qr
    } = update;
    
    if(connection) console.log(global.clock.info, "[Session]".main, "Connecting session...");
    if(timeout > 10) {
    		console.log(global.clock.info, "[Session]".main, "Program stopped after 10 times reconnecting!.");
    		return process.exit(1)
    	}
    
    // connection closed
    if(connection == "close") {
      const closeReason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if(closeReason == DisconnectReason.badSession) {
        console.log(global.clock.info, "[Session]".main, "Bad session file, Please delete old session and login again.");
      } else if(closeReason == DisconnectReason.connectionClosed) {
        timeout++
        console.log(global.clock.info, "[Session]".main, "Connection closed, Reconnecting again...");
        await start()
      } else if(closeReason == DisconnectReason.connectionLost) {
        timeout++
        console.log(global.clock.info, "[Session]".main, "Connection lost from server, Reconnecting again...");
        await start()
      } else if(closeReason == DisconnectReason.connectionReplaced) {
        console.log(global.clock.info, "[Session]".main, "Connection replaced, Please turn off another running session to start this session.");
      } else if(closeReason == DisconnectReason.loggedOut) {
        console.log(global.clock.info, "[Session]".main, "Connection logged out, Please login again and run.");
      } else if(closeReason == DisconnectReason.restartRequired) {
        timeout++
        console.log(global.clock.info, "[Session]".main, "Connection closed, Restart requiring. Reconnecting again...");
        await start()
      } else if(closeReason == DisconnectReason.connectionTimedOut) {
        timeout++
        console.log(global.clock.info, "[Session]".main, "Connection timeout, Reconnecting again...");
        await start()
      } else if(closeReason == DisconnectReason.multideviceMismatch) {
        console.log(global.clock.info, "[Session]".main, "Connection closed, Multi device mismatch. Please login again and run.");
      } else {
        timeout++
        console.log(global.clock.info, "[Session]".main, "Connection opened...");
        await start()
      }
    }
    
    // connection opened
    if(connection == "open") {
      console.log(global.clock.info, "[Session]".main, "Client connected on:", (client?.user?.id.split(":")[0] || global.botNumber).info);
    }
  });
  
}

start()