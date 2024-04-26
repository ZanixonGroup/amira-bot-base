import "./config.js";
import loadEvents from "./handler/Events.js";
import {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    makeInMemoryStore,
    jidNormalizedUser
} from "@whiskeysockets/baileys";
import Pino from "pino";
import { Boom } from "@hapi/boom";
import path from "path";

const store = makeInMemoryStore({ logger: Pino({ level: "fatal" }).child({ level: "fatal" }) })
const isPairing = process.argv.includes("--pairing");

async function start() {
  const auth = await useMultiFileAuthState("session");
  const client = makeWASocket({
    printQRInTerminal: !isPairing,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    auth: auth.state,
    logger: Pino({ level: "fatal" }).child({ level: "fatal" })
  });
  store.bind(client.ev);
  
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
  await loadEvents(client, "Events");
  
  // session manager
  client.ev.on("creds.update", auth.saveCreds);
  client.ev.on("connection.update", async(update) => {
    const {
      lastDisconnect,
      connection,
      qr
    } = update;
    
    if(connection) console.log(global.clock.info, "[Session]".main, "Connecting session...");
    
    // connection closed
    if(connection == "close") {
      const closeReason = new Boom(lastDisconnect?.error)?.output.statusCode;
      if(closeReason == DisconnectReason.badSession) {
        console.log(global.clock.info, "[Session]".main, "Bad session file, Please delete old session and login again.");
      } else if(closeReason == DisconnectReason.connectionClosed) {
        console.log(global.clock.info, "[Session]".main, "Connection closed, Reconnecting again...");
        await start()
      } else if(closeReason == DisconnectReason.connectionLost) {
        console.log(global.clock.info, "[Session]".main, "Connection lost from server, Reconnecting again...");
        await start()
      } else if(closeReason == DisconnectReason.connectionReplaced) {
        console.log(global.clock.info, "[Session]".main, "Connection replaced, Please turn off another running session to start this session.");
        process.exit(1)
      } else if(closeReason == DisconnectReason.loggedOut) {
        console.log(global.clock.info, "[Session]".main, "Connection logged out, Please login again and run.");
        process.exit(1)
      } else if(closeReason == DisconnectReason.restartRequired) {
        console.log(global.clock.info, "[Session]".main, "Connection closed, Restart requiring. Reconnecting again...");
        await start()
      } else if(closeReason == DisconnectReason.connectionTimedOut) {
        console.log(global.clock.info, "[Session]".main, "Connection timeout, Reconnecting again...");
        await start()
      } else if(closeReason == DisconnectReason.multideviceMismatch) {
        console.log(global.clock.info, "[Session]".main, "Connection closed, Multi device mismatch. Please login again and run.");
        process.exit(1)
      } else {
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