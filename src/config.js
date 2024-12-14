import colors from "colors";
import moment from "moment-timezone";
import { fileURLToPath } from 'url';
import { format } from "util";
import { filename } from "desm";

// main configs
global.botNumber = "62856971039021";
global.bot = {
  public: true,
  antiCall: true,
  owner: ["6285236216063"],
  sessionName: "session",
  prefix: /^[.]/i
}
Object.defineProperty(global, 'clock', {
  get: function() {
    return moment(Date.now()).tz("Asia/Jakarta").format("DD-MM-YY HH:mm:ss");
  },
  enumerable: true,
  configurable: true
});

// beautify logs
colors.setTheme({
   main: ['brightBlue', 'bold'],
   plain: "brightGrey",
   info: "brightGreen",
   warn: "brightYellow",
   danger: "brightRed"
});

// sticker exif
global.exif = {
  packId: "https://github.com/ZanixonGroup",
  packName: `s.id/amirabot`,
  packPublish: "© Amira-MD",
  packEmail: "zanixon.group@gmail.com",
  packWebsite: "https://github.com/ZanixonGroup",
  androidApp: "https://play.google.com/store/apps/details?id=com.bitsmedia.android.muslimpro",
  iOSApp: "https://apps.apple.com/id/app/muslim-pro-al-quran-adzan/id388389451?|=id",
  emojis: [],
  isAvatar: 0,
}

// alert messages
global.alertMessage = {
  owner: "Features can only be accessed by owner!",
  group: "Features only accessible in group!",
  private: "Features only accessible in private chat!",
  admin: "Features can only be accessed by group admin!",
  botAdmin: "Bot is not admin, you can't use the features!",
  bot: "Features only accessible by bot",
  media: "Reply media...",
  query: "No Query?",
  error: "Seems to have encountered an unexpected error.",
  quoted: "Reply message...",
  wait: "Wait a minute...",
  urlInvalid: "Url Invalid!",
  premium: "Premium Only Features!"
}

global.logs = {
  error: (path, logs) => {
    if(!logs) return;
    console.log(global.clock.info, "[ERROR]".danger, `location: ${filename(path)}`.warn,
    "\n" + format(logs).danger);
  },
  warn: (path, logs) => {
    if(!logs) return;
    console.log(global.clock.info, "[WARN]".warn, `location: ${filename(path)}`.warn,
    "\n" + format(logs).warn);
  },
  commandError: (path, m = {}, logs) => {
    if(!logs) return;
    console.log(global.clock.info, "[COMMAND ERROR]".danger, `location: ${filename(path)}`.warn,
    "\n" + "Sender: ".info + m?.sender,
    "\n" + "Command: ".info + m?.command,
    "\n" + "Body: ".info + m?.body,
    "\n" + "Logs: ".info + format(logs).danger);
  },

}
