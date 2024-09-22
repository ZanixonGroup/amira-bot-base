/*
    Baileys MessageCollector by github.com/ZTRdiamond
    ------------------------------------------------------
    Inspired from @mengkodingan/ckptw
    Source: https://github.com/ZanixonGroup/amira-bot-base
    | Don't delete this credit!
*/
import EventEmitter from 'events';
import { Serialize } from "../libs/serialize.js";

class MessageCollector {
  #collecting;
  #client;
  #options;
  #context;
  #timeoutId;
  #event;
  #messageCount;

  constructor(context, options = {}) {
    this.#collecting = true;
    this.#client = global.client;
    this.#context = context;
    this.#options = options;
    this.#timeoutId = null;
    this.#messageCount = 0;
    this.timeout(options?.timeout || 30000);
    this.#event = new EventEmitter();
    this.#client.ev.on("messages.upsert", async ({ messages }) => {
      const m = await Serialize(this.#client, messages[0]);
      this.collect.bind(this, m)();
    });
  }

  async collect(m) {
    if (!this.#collecting) return;
    const message = m?.body;
    const author = this.#context?.key?.participant || this.#context?.key?.remoteJid;
    const sender = m?.key?.participant || m?.key?.remoteJid;
    if (!m?.key?.fromMe && author == sender && (message?.length || m.isMedia || m.quoted?.isMedia)) {
      this.#event.emit("collect", {
        author,
        sender,
        message,
        quoted: m?.isQuoted ? m?.quoted : m,
        ...m
      });
      this.#messageCount++;
      return;
    } else return null;
  }

  timeout(ms) {
    if (ms <= 0) return;
    this.#timeoutId = setTimeout(() => {
      this.exit();
    }, ms);
  }

  collected() {
    clearTimeout(this.#timeoutId);
    this.#collecting = false;
    this.#event.emit("end", {
      status: "collected"
    });
  }

  exit() {
    clearTimeout(this.#timeoutId);
    this.#collecting = false;
    this.#event.emit('end', {
      status: "exit"
    });
  }

  on(event, listener) {
    this.#event.on(event, listener);
  }

  once(event, listener) {
    this.#event.once(event, listener);
  }
}

export default MessageCollector;